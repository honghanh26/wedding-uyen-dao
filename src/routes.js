import React from 'react';
import NotFound from './admin/pages/NotFound';
import Banners from './admin/pages/banners';
import BannersForm from './admin/pages/banners/form';
import Users from './admin/pages/users';
import UsersForm from './admin/pages/users/form';
import Galleries from './admin/pages/galleries';
import GalleriesForm from './admin/pages/galleries/form';
import Events from './admin/pages/events';
import EventsForm from './admin/pages/events/form';
import Stories from './admin/pages/stories';
import StoriesForm from './admin/pages/stories/form';

export const ROUTE_ADMIN_NOTFOUND = "/notfound";
export const ROUTE_ADMIN_BANNERS = "/banners";
export const ROUTE_ADMIN_ADD_BANNER = "/banners/add";
export const ROUTE_ADMIN_EDIT_BANNER = "/banners/edit/:id";
export const ROUTE_ADMIN_USERS = "/users";
export const ROUTE_ADMIN_ADD_USER = "/users/add";
export const ROUTE_ADMIN_EDIT_USER = "/users/edit/:id";
export const ROUTE_ADMIN_GALLERIES = "/galleries";
export const ROUTE_ADMIN_ADD_GALLERY = "/galleries/add";
export const ROUTE_ADMIN_EDIT_GALLERY = "/galleries/edit/:id";
export const ROUTE_ADMIN_EVENTS = "/events";
export const ROUTE_ADMIN_ADD_EVENT = "/events/add";
export const ROUTE_ADMIN_EDIT_EVENT = "/events/edit/:id";
export const ROUTE_ADMIN_STORIES = "/stories";
export const ROUTE_ADMIN_ADD_STORY = "/stories/add";
export const ROUTE_ADMIN_EDIT_STORY = "/stories/edit/:id";

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
        path : ROUTE_ADMIN_GALLERIES,
        exact : true,
        main : ({ match, location }) => <Galleries match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_ADD_GALLERY,
        exact : false,
        main : ({ match, location }) => <GalleriesForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EDIT_GALLERY,
        exact : false,
        main : ({ match, location }) => <GalleriesForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EVENTS,
        exact : true,
        main : ({ match, location }) => <Events match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_ADD_EVENT,
        exact : false,
        main : ({ match, location }) => <EventsForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EDIT_EVENT,
        exact : false,
        main : ({ match, location }) => <EventsForm match={match} location={location} />
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
        main : ({ match, location }) => <Stories match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_ADD_STORY,
        exact : false,
        main : ({ match, location }) => <StoriesForm match={match} location={location} />
    },
    {
        path : ROUTE_ADMIN_EDIT_STORY,
        exact : false,
        main : ({ match, location }) => <StoriesForm match={match} location={location} />
    }
];

export default routes;