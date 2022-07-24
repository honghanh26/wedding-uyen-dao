import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import TableCard from './TableCard';
import UserContext from '../../../UserContext';
import * as routes from '../../../routes';

export default function Users() {
    const { users } = useContext(UserContext);
    const [data, setData] = useState(users);
    useEffect(() => {
        setData(users);
    }, [users]);

    return (
        <>
            <div className="py-3 md:p-3 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="text-right mb-2">
                        <Link to={`/admin${routes.ROUTE_ADMIN_ADD_USER}`}>
                            <IconButton>
                                <i className="fas fa-plus text-xl"></i>
                            </IconButton>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 mb-8">
                        <TableCard list={data}/>
                    </div>
                </div>
            </div>
        </>
    );
}
