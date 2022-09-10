import React, { useState, useEffect, useContext } from "react";
import UserContext from '../../UserContext';

function Story(props) {
    const [data, setData] = useState([]);
    const { strings } = useContext(UserContext);

    useEffect(() => {
        setData(props.listStories);
    }, [props.listStories])

    return (
        <>
            {/* <!-- Start Story --> */}
            {data.length > 0 &&
            <div id="story" className="story-box main-timeline-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box">
                                <h2>{strings.story.title}</h2>
                                <p>{strings.story.description} </p>
                            </div>
                        </div>
                    </div>
                    {data.map((item, idx) => {
                        return(
                            <div key={idx} className={`row timeline-element ${(idx % 2 !== 0 ? "reverse" : "")} separline`}>
                                <div className="timeline-date-panel col-xs-12 col-md-6  align-left">         
                                    <div className="time-line-date-content">
                                        <p className="mbr-timeline-date mbr-fonts-style display-font">
                                            {new Date(item.date).toLocaleDateString('vi-VN', {day : 'numeric', month : 'long', year : 'numeric'})}  
                                        </p>
                                    </div>
                                </div>
                                <span className="iconBackground"></span>
                                <div className={`col-xs-12 col-md-6 ${(idx % 2 !== 0 ? "align-right" : "align-left")}`}>
                                    <div className="timeline-text-content">
                                        <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-font">{item.name}</h4>
                                        <p className="mbr-timeline-text mbr-fonts-style display-7">
                                        {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            }
            {/* <!-- End Story --> */}
        </>
    );
}

export default Story;
