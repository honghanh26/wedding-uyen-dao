import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import UserContext from '../../UserContext';
import * as Api from '../../Api';

function Header() {
    const { strings } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            guest: "",
            event: "",
            message: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
            .required(strings.contact.errorName),
            email: Yup.string()
            .email(strings.contact.errorEmailType)
            .required(strings.contact.errorEmail),
            guest: Yup.string()
            .required(strings.contact.errorGuest),
            event: Yup.string()
            .required(strings.contact.errorAttending),
            message: Yup.string()
            .required(strings.contact.errorMessage)
        }),
        onSubmit: async(values, { resetForm }) => {
            setIsError(false);
            setIsLoading(true);
            let url = Api.API_GET_SEND_EVENT;
            let method = "post";
            let body = Object.assign({}, values);

            switch (body.event) {
                case "1":
                    body.event = "All events";
                    break;
                case "2":
                    body.event = "Wedding ceremony";
                    break;
                case "3":
                    body.event = "Reception party";
                    break;
                default:
                    break;
            }
            
            try {
                await axios({
                    method: method,
                    url: url,
                    data: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                })
                .then(response => {
                    resetForm();
                })
                .catch(error => { setIsError(true) });
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        }
    });

    return (
        <>
            {/* <!-- Start Contact --> */}
            <div id="contact" className="contact-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box">
                                <h2>{strings.contact.title}</h2>
                                <p>{strings.contact.description} </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                        <div className="contact-block">
                            <form id="contactForm" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder={strings.contact.name}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.name && formik.touched.name && (
                                            <div className="help-block with-errors text-danger">{formik.errors.name}</div>
                                        )}
                                    </div>                                 
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder={strings.contact.email} id="email" className="form-control" name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                            <div className="help-block with-errors text-danger">{formik.errors.email}</div>
                                        )}
                                    </div> 
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select className="custom-select d-block form-control" id="guest" name="guest"
                                            value={formik.values.guest}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option disabled value="">{strings.contact.guest}*</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        {formik.errors.guest && formik.touched.guest && (
                                            <div className="help-block with-errors text-danger">{formik.errors.guest}</div>
                                        )}
                                    </div> 
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select className="custom-select d-block form-control" id="event" name="event"
                                            value={formik.values.event}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option disabled value="">{strings.contact.attending}*</option>
                                            <option value="1">All events</option>
                                            <option value="2">Wedding ceremony</option>
                                            <option value="3">Reception party</option>
                                        </select>
                                        {formik.errors.event && formik.touched.event && (
                                            <div className="help-block with-errors text-danger">{formik.errors.event}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group"> 
                                        <textarea className="form-control" id="message" name="message" placeholder={strings.contact.message} rows="8"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.message}
                                        ></textarea>
                                        {formik.errors.message && formik.touched.message && (
                                            <div className="help-block with-errors text-danger">{formik.errors.message}</div>
                                        )}
                                    </div>
                                    <div className="submit-button text-center">
                                        <button className="btn btn-common" id="submit" type="submit" disabled={isLoading}>{strings.contact.send}</button>
                                        {isError &&
                                            <div id="msgSubmit" className="h3 text-center">{strings.contact.errorSend}</div> 
                                        }
                                        <div className="clearfix"></div> 
                                    </div>
                                </div>
                            </div>            
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Contact --> */}
        </>
    );
}

export default Header;
