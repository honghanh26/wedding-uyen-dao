import React, {useState, useEffect, useMemo} from "react";
import { Route, Routes } from "react-router-dom";
import LocalizedStrings from 'react-localization';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import translationEN from '../locales/en/translation';
import translationVI from '../locales/vi/translation';
import { UserProvider } from '../UserContext';

// the translations
const resources = {
    en: translationEN,
    vi: translationVI
};

let strings = new LocalizedStrings(resources);

function UserHome() {
    const [language, setLanguage] = useState("vi");

    useEffect(() => {
        strings.setLanguage(language);
    }, [language]);

    const providerValue = useMemo(() => ({
        language, setLanguage,
        strings
    }), [language]);

    return (
        <UserProvider value={providerValue}>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/*"
                    element={<NotFound />}
                />
            </Routes>
        </UserProvider>
    );
}

export default UserHome;
