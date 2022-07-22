import React from 'react';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/Banners';

export const ROUTE_ADMIN_NOTFOUND = "/notfound";
export const ROUTE_ADMIN_BANNERS = "/banners";

const routes = [
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