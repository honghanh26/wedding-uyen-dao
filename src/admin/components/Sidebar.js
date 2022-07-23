import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import * as routes from '../../routes';
import UserContext from '../../UserContext';

const menus = [
    {
        name : 'Users',
        to : '/admin/users',
        exact : true,
        icon: 'fas fa-users'
    },
    {
        name : 'Banners',
        to : '/admin' + routes.ROUTE_ADMIN_BANNERS,
        exact : true,
        icon: 'fas fa-sliders-h'
    },
    {
        name : 'Events',
        to : '/admin' + routes.ROUTE_ADMIN_EVENTS,
        exact : true,
        icon: 'fas fa-calendar-alt'
    },
    {
        name : 'Stories',
        to : '/admin' + routes.ROUTE_ADMIN_STORIES,
        exact : true,
        icon: 'fas fa-history'
    }
];

//Custom Link
const MenuLink = ({
    label,
    to,
    activeOnlyWhenExact,
    icon
}) => {
    let className = 'flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg';
    let activeClassName = ' bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md';

    return (
        <li className="rounded-lg mb-2">
            <NavLink
                to={to}
                exact={activeOnlyWhenExact.toString()}
                className={({ isActive }) => (isActive ? className + activeClassName : className)}
            >
                <i className={icon}></i>
                {label}
            </NavLink>
        </li>  
    );
}

const showMenus = (menus) => {
    var result = null;

    if (menus.length > 0) {
        result = menus.map((menu, index) => {
            return (
                <MenuLink 
                    key={index} 
                    label={menu.name} 
                    to={menu.to} 
                    activeOnlyWhenExact={menu.exact}
                    icon={menu.icon}
                />
            );
        });
    }

    return result;
}

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const { boy, girl } = useContext(UserContext);

    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <h6 color="gray">{boy.name} - {girl.name}</h6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            { showMenus(menus) }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
