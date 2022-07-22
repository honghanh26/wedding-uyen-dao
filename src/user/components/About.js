import React, { useState, useEffect } from "react";

function About(props) {
    const [boy, setBoy] = useState(props.boy);
    const [girl, setGirl] = useState(props.girl);
    const [imgBoy, setImgBoy] = useState("");
    const [imgGirl, setImgGirl] = useState("");

    useEffect(() => {
        if(props.boy?.img?.data) {
            const blobBoy = new Blob([Int8Array.from(props.boy.img.data.data)], {type: props.boy.img.contentType });
            const imageBoy = window.URL.createObjectURL(blobBoy);

            setImgBoy(imageBoy);
        }
        setBoy(props.boy);
    }, [props.boy])

    useEffect(() => {
        if(props.girl?.img?.data) {
            const blobGirl = new Blob([Int8Array.from(props.girl.img.data.data)], {type: props.girl.img.contentType });
            const imageGirl = window.URL.createObjectURL(blobGirl);

            setImgGirl(imageGirl);
        }
        setGirl(props.girl);
    }, [props.girl])

    return (
        <>
            {/* <!-- Start About us --> */}
            <div id="about" className="about-box">
                <div className="about-a1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title-box">
                                    <h2>{girl.name} <span>&</span> {boy.name}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="row align-items-center about-main-info">
                                    <div className="col-lg-8 col-md-6 col-sm-12">
                                        <h2> About <span>{girl.name}</span></h2>
                                        <p>{girl.description}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="about-img">
                                            <img className="img-fluid rounded" src={imgGirl} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center about-main-info">
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="about-img">
                                            <img className="img-fluid rounded" src={imgBoy} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-6 col-sm-12">
                                        <h2> About <span>{boy.name}</span></h2>
                                        <p>{boy.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End About us --> */}
        </>
    );
}

export default About;
