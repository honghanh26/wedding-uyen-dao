import React, { useState, useEffect, useContext } from 'react';
import TableCard from './TableCard';
import UserContext from '../../../UserContext';

export default function Banners() {
    const { users } = useContext(UserContext);
    const [data, setData] = useState(users);
    useEffect(() => {
        setData(users);
    }, [users]);

    return (
        <>
            <div className="px-3 py-8 md:p-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <TableCard list={data}/>
                    </div>
                </div>
            </div>
        </>
    );
}
