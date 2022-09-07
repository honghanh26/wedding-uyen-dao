import {
    Avatar,
    Card,
    CardHeader,
    CardBody,
    IconButton,
  } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../routes';
import ImgDefault from '../../assets/img/default-thumbnail.jpeg';

export default function CardTable(props) {
    const [data, setData] = useState(props.list);

    useEffect(() => {
        setData(props.list);
    }, [props.list])

    return (
        <Card>
            <CardHeader color="blue" className="px-3 pt-2 mt-4">
                <h2 className="text-white text-2xl">List Users</h2>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2 text-blue-500 align-middle border-b border-solid border-gray-200 text-sm whitespace-nowrap font-light text-left">
                                    Name
                                </th>
                                <th className="p-2 text-blue-500 align-middle border-b border-solid border-gray-200 text-sm whitespace-nowrap font-light text-left">
                                    Description
                                </th>
                                <th className="p-2 text-blue-500 align-middle border-b border-solid border-gray-200 text-sm whitespace-nowrap font-light text-left">
                                    Image
                                </th>
                                <th className="p-2 text-blue-500 align-middle border-b border-solid border-gray-200 text-sm whitespace-nowrap font-light text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((item, idx) => {
                            let image = ImgDefault;
                            if(item?.img) {
                                image = process.env.REACT_APP_UPLOAD_URL + "/" + item.img;
                            }

                            return (
                                <tr key={idx}>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap p-2 text-left">
                                        {item.name}
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap p-2 text-left">
                                        {item.description}
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap p-2 text-left">
                                        <div className="flex">
                                            <div className="w-14 h-14 rounded-full border-2 border-white">
                                                <Avatar
                                                    src={image}
                                                    variant="circular"
                                                />
                                            </div>
                                        </div>
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap p-2 text-left">
                                        <Link to={`/admin20220925${routes.ROUTE_ADMIN_EDIT_USER.replace(":id", item.id)}`}>
                                            <IconButton size="sm" color="amber">
                                                <i className="fas fa-pen"></i>
                                            </IconButton>
                                        </Link>
                                        <IconButton size="sm" color="red" className="ml-2">
                                            <i className="fas fa-trash"></i>
                                        </IconButton>
                                    </th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
