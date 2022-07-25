import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ImgDefault from '../assets/img/default-img.gif';

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
                            let image = ImgDefault;
                            if(item?.img) { //if(item?.img?.data)
                                // const blob = new Blob([Int8Array.from(item.img.data.data)], {type: item.img.contentType });
                                // image = window.URL.createObjectURL(blob);
                                image = process.env.REACT_APP_UPLOAD_URL + "/" + item.img;
                            }
                            
                            return(
                                <div key={idx}>
                                    <div className="lbox-caption" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover'}}>
                                        <div className="lbox-details py-10">
                                            <h1>#{props.girl.name} & #{props.boy.name}</h1>
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
