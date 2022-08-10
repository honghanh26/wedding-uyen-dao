import React, { useState, useEffect, useContext } from "react";
import ImgDefault from '../assets/img/default-img.gif';
import UserContext from '../../UserContext';

function About(props) {
    const [boy, setBoy] = useState(props.boy);
    const [girl, setGirl] = useState(props.girl);
    const [imgBoy, setImgBoy] = useState("");
    const [imgGirl, setImgGirl] = useState("");
    const { strings } = useContext(UserContext);

    useEffect(() => {
        let imageBoy = ImgDefault;
        if(props.boy?.img) {
            imageBoy = process.env.REACT_APP_UPLOAD_URL + "/" + props.boy.img;
        }
        setBoy(props.boy);
        setImgBoy(imageBoy);
    }, [props.boy])

    useEffect(() => {
        let imageGirl = ImgDefault;
        if(props.girl?.img) {
            imageGirl = process.env.REACT_APP_UPLOAD_URL + "/" + props.girl.img;
        }
        setGirl(props.girl);
        setImgGirl(imageGirl);
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
                                    <h2>{girl?.name} <span>&</span> {boy?.name}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="row align-items-center about-main-info">
                                    <div className="col-lg-8 col-md-6 col-sm-12">
                                        <h2> {strings.about.aboutGirl} <span>{girl?.name}</span></h2>
                                        <p>{girl?.description}</p>
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
                                        <h2> {strings.about.aboutBoy} <span>{boy?.name}</span></h2>
                                        <p>{boy?.description}</p>
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
