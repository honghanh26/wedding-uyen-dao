import React from 'react';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/banners';
import BannersForm from './admin/pages/banners/form';
import Users from './admin/pages/users';
import UsersForm from './admin/pages/users/form';

export const ROUTE_ADMIN_NOTFOUND = "/notfound";
export const ROUTE_ADMIN_BANNERS = "/banners";
export const ROUTE_ADMIN_ADD_BANNER = "/banners/add";
export const ROUTE_ADMIN_EDIT_BANNER = "/banners/edit/:id";
export const ROUTE_ADMIN_USERS = "/users";
export const ROUTE_ADMIN_ADD_USER = "/users/add";
export const ROUTE_ADMIN_EDIT_USER = "/users/edit/:id";
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
        exact : true,
        main : ({ match, location }) => <Banners match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_ADD_BANNER,
        exact : false,
        main : ({ match, location }) => <BannersForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EDIT_BANNER,
        exact : false,
        main : ({ match, location }) => <BannersForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EVENTS,
        exact : true,
        main : ({ match, location }) => <Users match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_USERS,
        exact : true,
        main : ({ match, location }) => <Users match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_ADD_USER,
        exact : false,
        main : ({ match, location }) => <UsersForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EDIT_USER,
        exact : false,
        main : ({ match, location }) => <UsersForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_STORIES,
        exact : true,
        main : ({ match, location }) => <Users match={match} location={location} />
    }
];

export default routes;