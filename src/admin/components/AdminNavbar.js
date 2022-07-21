import { useLocation } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    return (
        <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <IconButton variant="text" size="lg" onClick={() => setShowSidebar('left-0')}>
                        <i className="fas fa-bars text-2xl text-white"></i>
                    </IconButton>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <IconButton variant="text" size="lg" onClick={() => setShowSidebar('-left-64')}>
                            <i className="fas fa-times text-2xl text-white"></i>
                        </IconButton>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4>
                </div>
            </div>
        </nav>
    );
}
