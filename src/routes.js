import React from 'react';
import Home from './user/pages/Home';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/Banners';

export const ROUTE_USER_HOME = "/";
export const ROUTE_ADMIN_NOTFOUND = "/admin/notfound";
export const ROUTE_ADMIN_BANNERS = "/admin/banners";

const routes = [
    {
        path : ROUTE_USER_HOME,
        exact : true,
        main : () => <Home />
    },
    {
        path : ROUTE_ADMIN_NOTFOUND,
        exact : false,
        main : () => <NotFound />
    },
    {
        path : ROUTE_ADMIN_BANNERS,
        exact : false,
        main : ({ match, location }) => <Banners match={match} location={location} />
    }
];

export default routes;