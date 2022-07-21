import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from './admin/components/Sidebar';
import routes from './routes';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Routes>
                    { showContentMenu(routes) }
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
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
                    component={route.main} 
                />
            );
        });
    }

    return result;
}

export default App;
