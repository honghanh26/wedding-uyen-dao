import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Api from '../Api';

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';   
import './assets/css/responsive.css';
import './assets/css/custom.css';

import Header from './components/Header';
import Banner from './components/Banner';

function UserHome() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_ALL_BANNERS,
                );
                
                setData(result.data.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        fetchData();
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
            <Banner listBanners={data}/>
        </div>
    );
}

export default UserHome;
