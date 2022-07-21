import React from 'react';
import Home from './user/pages/Home';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/Banners';

const routes = [
    {
        path : '/',
        exact : true,
        main : () => <Home />
    },
    {
        path : '/notfound',
        exact : false,
        main : () => <NotFound />
    },
    {
        path : '/banners',
        exact : false,
        main : ({ match, location }) => <Banners match={match} location={location} />
    }
];

export default routes;