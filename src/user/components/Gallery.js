import React, { useState, useEffect, useContext } from "react";
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
import ImgDefault from '../assets/img/default-img.gif';
import UserContext from '../../UserContext';

function Gallery(props) {
    const { strings } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [listImgs, setListImgs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setData(props.listGalleries);
    }, [props.listGalleries])

    const showPopupImg = (e) => {
        e.preventDefault();
        setIsOpen(true);

        const id = e.target.getAttribute("data-id");
        let gallery = data.find(item => item._id === id);
        let arrImgs = [];

        if(gallery?.img && gallery.img.length > 0) {
            gallery.img.forEach(item => {
                arrImgs.push(process.env.REACT_APP_UPLOAD_URL + "/" + item);
            });
        }
        
        setListImgs(arrImgs);
    }

    return (
        <>
            {/* <!-- Start Gallery --> */}
            <div id="gallery" className="gallery-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box">
                                <h2>{strings.gallery.title}</h2>
                                <p>{strings.gallery.description} </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ul className="popup-gallery clearfix">
                            {data.map((item, idx) => {
                                let image = ImgDefault;
                                if(item?.img && item.img.length > 0) {
                                    image = process.env.REACT_APP_UPLOAD_URL + "/" + item.img[0];
                                }

                                return(
                                    <li key={idx} onClick={(e) => showPopupImg(e)}>
                                        <a href={image} data-id={item._id}>
                                            <img className="img-fluid" src={image} alt={item.name}/>
                                            <span className="overlay"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                        <ReactBnbGallery
                            show={isOpen}
                            photos={listImgs}
                            onClose={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            </div>
            {/* <!-- End Gallery --> */}
        </>
    );
}

export default Gallery;
