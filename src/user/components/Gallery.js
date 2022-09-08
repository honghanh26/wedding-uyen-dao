import React, { useState, useEffect, useContext, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import UserContext from '../../UserContext';

function GalleryPhoto(props) {
    const { strings } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [listImgs, setListImgs] = useState([]);
    const [listImgsDetail, setListImgsDetail] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        const id = photo.id;
        let gallery = data.find(item => item._id === id);
        let arrImgsDetail = [];

        if(gallery?.img && gallery.img.length > 0) {
            gallery.img.forEach(item => {
                let objDetail = {
                    src: process.env.REACT_APP_UPLOAD_URL + "/" + item,
                    width: 1,
                    height: 1,
                    id: gallery._id
                }
                arrImgsDetail.push(objDetail);
            });
        }
        
        setListImgsDetail(arrImgsDetail);
        setCurrentImage(0);
        setViewerIsOpen(true);
    }, [data]);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        let listGalleries = props.listGalleries;
        let arrImgs = [];

        listGalleries.forEach(item => {
            if(item?.img && item.img.length > 0) {
                let obj = {
                    src: process.env.REACT_APP_UPLOAD_URL + "/" + item.img[0],
                    width: 1,
                    height: 1,
                    id: item._id
                }
                arrImgs.push(obj);
            }
        });
        
        setData(listGalleries);
        setListImgs(arrImgs);
    }, [props.listGalleries])

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
                    <div>
                        <Gallery photos={listImgs} onClick={openLightbox} />
                        <ModalGateway>
                            {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                currentIndex={currentImage}
                                views={listImgsDetail.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                                />
                            </Modal>
                            ) : null}
                        </ModalGateway>
                    </div>
                </div>
            </div>
            {/* <!-- End Gallery --> */}
        </>
    );
}

export default GalleryPhoto;
