import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Api from '../../Api';

import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';   
import '../assets/css/responsive.css';
import '../assets/css/custom.css';

import Header from '../components/Header';
import Banner from '../components/Banner';
import About from '../components/About';
import Family from '../components/Family';
import Event from '../components/Event';
import Story from '../components/Story';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function UserHome() {
    const [banners, setBanners] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [stories, setStories] = useState([]);
    const [boy, setBoy] = useState({});
    const [girl, setGirl] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_BANNERS,
                );
                
                setBanners(result.data.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        const fetchUsers = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_USERS,
                );
                let usersTemp = result.data.data;
                let boyTemp = usersTemp.find(item => item.role === 'husband');
                let girlTemp = usersTemp.find(item => item.role === 'wife');

                setUsers(usersTemp);
                setBoy(boyTemp);
                setGirl(girlTemp);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        const fetchEvents = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_EVENTS,
                );
                
                setEvents(result.data.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        const fetchStories = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_STORIES,
                );
                
                setStories(result.data.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchBanners();
        fetchUsers();
        fetchEvents();
        fetchStories();
    }, []);

    return (
        <div id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
            {(isLoading || isError) &&
                /* <!-- LOADER --> */
                <div id="preloader">
                    <div className="preloader pulse">
                        <i className="fa fa-heartbeat" aria-hidden="true"></i>
                    </div>
                </div>
                /* <!-- END LOADER --> */
            }
            <Header/>
            <Banner listBanners={banners} boy={boy} girl={girl}/>
            <About boy={boy} girl={girl}/>
            <Story listStories={stories}/>
            <Family listUsers={users}/>
            <Event listEvents={events}/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default UserHome;
