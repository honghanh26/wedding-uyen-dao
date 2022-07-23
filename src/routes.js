import React from 'react';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/banners';
import Users from './admin/pages/users';

export const ROUTE_ADMIN_NOTFOUND = "/notfound";
export const ROUTE_ADMIN_BANNERS = "/banners";
export const ROUTE_ADMIN_USERS = "/users";
export const ROUTE_ADMIN_EVENTS = "/events";
export const ROUTE_ADMIN_STORIES = "/stories";

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
    },
    {
        path : ROUTE_ADMIN_EVENTS,
        exact : false,
        main : ({ match, location }) => <Users match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_USERS,
        exact : false,
        main : ({ match, location }) => <Users match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_STORIES,
        exact : false,
        main : ({ match, location }) => <Users match={match} location={location} />
    }
];

export default routes;