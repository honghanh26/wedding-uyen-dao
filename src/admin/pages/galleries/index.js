import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import TableCard from './TableCard';
import * as Api from '../../../Api';
import * as routes from '../../../routes';

export default function Galleries() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_GALLERIES,
                );
                
                setData(result.data.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="py-3 md:p-3 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="text-right mb-2">
                        <Link to={`/admin${routes.ROUTE_ADMIN_ADD_GALLERY}`}>
                            <IconButton>
                                <i className="fas fa-plus text-xl"></i>
                            </IconButton>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 mb-8">
                        {isError && 
                        <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                            <i className="fas fa-exclamation-triangle"></i>
                            Something went wrong...
                        </button>
                        }
                        {isLoading ? (
                            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </button>
                        ) : (
                            <TableCard list={data}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
