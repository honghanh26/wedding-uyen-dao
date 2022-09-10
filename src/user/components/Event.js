import React, { useState, useEffect, useContext } from "react";
import ImgDefault from '../assets/img/default-img.gif';
import UserContext from '../../UserContext';

function Event(props) {
    const [data, setData] = useState([]);
    const { strings } = useContext(UserContext);

    useEffect(() => {
        setData(props.listEvents);
    }, [props.listEvents])

    return (
        <>
            {/* <!-- Start Events --> */}
            {data.length > 0 &&
            <div id="events" className="events-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box">
                                <h2>{strings.header.event}</h2>
                                <p>{strings.event.description} </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {data.map((item, idx) => {
                            let image = ImgDefault;
                            if(item?.img) {
                                image = process.env.REACT_APP_UPLOAD_URL + "/" + item.img;
                            }

                            return(
                                <div key={idx} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="event-inner">
                                        <div className="event-img">
                                            <img className="img-fluid" src={image} alt={item.name} />
                                        </div>
                                        <h2>{new Date(item.date).toLocaleDateString('vi-VN', {day : 'numeric', month : 'long', year : 'numeric'})} {item.name}</h2>
                                        <p>{item.description} </p>
                                        {item.location && 
                                            <a href={`http://maps.google.com/?q=${item.location}`} target="_blank" rel="noreferrer">{strings.event.seeLocation} &gt;</a>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            }
            {/* <!-- End Events --> */}
        </>
    );
}

export default Event;
