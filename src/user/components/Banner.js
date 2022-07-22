import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Banner(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [data, setData] = useState(props.listBanners);

    useEffect(() => {
        setData(props.listBanners);
    }, [props.listBanners])

    return (
        <>
            {/* <!-- Start Banner --> */}
            <div className="ulockd-home-slider">
                <div className="container-fluid px-0">
                    <Slider {...settings}>
                        {data.map((item, idx) => {
                            const blob = new Blob([Int8Array.from(item.img.data.data)], {type: item.img.contentType });
                            const image = window.URL.createObjectURL(blob);
                            
                            return(
                                <div key={idx}>
                                    <div className="lbox-caption" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover'}}>
                                        <div className="lbox-details py-10">
                                            <h1>#Leida & #Dominic</h1>
                                            <h2>{item.description}</h2>
                                            <p>Save The Date <strong>20 June 2018</strong></p>
                                            <a href="#contact" className="btn">Contact</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            {/* <!-- End Banner --> */}
        </>
    );
}

export default Banner;
