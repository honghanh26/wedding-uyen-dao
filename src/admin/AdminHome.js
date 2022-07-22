import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar';
import routes from '../routes';

function AdminHome() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Routes>
                    { showContentMenu(routes) }
                    <Route
                        path="/admin"
                        element={<Navigate to="/admin/banners" replace />}
                    />
                </Routes>
            </div>
        </>
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
