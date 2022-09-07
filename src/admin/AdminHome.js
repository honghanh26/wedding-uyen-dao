import React, { useState, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from 'axios';
import Sidebar from './components/Sidebar';
import routes from '../routes';
import * as Api from '../Api';
import { UserProvider } from '../UserContext';

function AdminHome() {
    const [users, setUsers] = useState([]);
    const [boy, setBoy] = useState({});
    const [girl, setGirl] = useState({});
    const [reload, setReload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchUsers = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
            const result = await axios(
                Api.API_GET_ALL_USERS,
            );
            let usersTemp = result.data.data;
            let boyTemp = usersTemp.find(item => item.role === 'husband');
            let girlTemp = usersTemp.find(item => item.role === 'wife');

            setUsers(usersTemp);
            setBoy(boyTemp);
            setGirl(girlTemp);
        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
        setReload(false);
    };
    const providerValue = useMemo(() => ({
        users, setUsers,
        boy, setBoy,
        girl, setGirl,
        setReload
    }), [users, boy, girl]);

    useEffect(() => {
        if(reload) {
            fetchUsers();
        }
    }, [reload]);

    return (
        <UserProvider value={providerValue}>
            {(isLoading || isError) && 
                /* <!-- LOADER --> */
                <div id="preloader">
                    <div className="preloader pulse">
                        <i className="fa fa-heartbeat" aria-hidden="true"></i>
                    </div>
                </div>
                /* <!-- END LOADER --> */  
            }
            <Sidebar />
            <div className="md:ml-64">
                <Routes>
                    { showContentMenu(routes) }
                    <Route
                        path="/"
                        element={<Navigate to="/admin20220925/users" replace />}
                    />
                </Routes>
            </div>
        </UserProvider>
    );
}

const showContentMenu = (routes) => {
    var result = null;

    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (
                <Route 
                    key={index} 
                    path={route.path} 
                    exact={route.exact} 
                    element={React.createElement(route.main)}
                />
            );
        });
    }

    return result;
}

export default AdminHome;
