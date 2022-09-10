import React, { useState, useEffect, useContext } from "react";
import ImgDefault from '../assets/img/default-img.gif';
import UserContext from '../../UserContext';

function Family(props) {
    const [data, setData] = useState([]);
    const { strings } = useContext(UserContext);

    useEffect(() => {
        let arrUser = props.listUsers.filter((item) => item.role !== "husband" && item.role !== "wife");

        setData(arrUser);
    }, [props.listUsers])

    return (
        <>
            {/* <!-- Start Family --> */}
            {data.length > 0 &&
            <div id="family" className="family-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box">
                                <h2>{strings.header.family}</h2>
                                <p>{strings.family.description} </p>
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
                                    <div className="single-team-member">
                                        <div className="family-img">
                                            <img className="img-fluid" src={image} alt={item.name} />
                                        </div>
                                        <div className="family-info">
                                            <h4>{item.name} </h4>
                                            <p>{`{ ${item.description} }`}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            }
            {/* <!-- End Family --> */}
        </>
    );
}

export default Family;
