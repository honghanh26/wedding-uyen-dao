import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Avatar } from '@material-tailwind/react';
import * as routes from '../../../routes';
import * as Api from '../../../Api';
import ImgDefault from '../../assets/img/default-thumbnail.jpeg';

export default function GalleriesForm() {
    const navigate = useNavigate();
    const [gallery, setGallery] = useState({});
    const [value, setValue] = useState({});
    // const [listImage, setListImage] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [listIndexUpdate, setListIndexUpdate] = useState([]);
    const [limitImage, setLimitImage] = useState(parseInt(process.env.REACT_APP_LIMIT_UPLOAD_IMAGE));
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [mgsError, setMgsError] = useState("");
    const fileInput = useRef([]);
    const { id } = useParams();
    let titlePage = "Add";

    if(id) {
        titlePage = "Edit";
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(
                    Api.API_GET_GALLERY.replace(":id", id),
                );
                
                if(result.data.data.length > 0) {
                    setGallery(result.data.data[0]);
                } else {
                    setGallery({});
                }
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        if(id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if(Object.keys(gallery).length > 0) {
            setValue({
                name: gallery.name,
                description: gallery.description
            });
            let arrImg = [];

            if(gallery?.img && gallery.img.length > 0) {
                gallery.img.forEach(element => {
                    let image = ImgDefault;

                    if(element) {
                        image = element;
                    }

                    arrImg.push(image);
                });
            }
            
            // setListImage(arrImg);
            setSelectedImage(arrImg);
        }
    }, [gallery]);

    useEffect(() => {
        if(limitImage < 0) {
            setMgsError("Số lượng hình ảnh không vượt quá 10 hình trên một lần upload");
        } else {
            setMgsError("");
        }
    }, [limitImage]);

    const handleChange = (event) => {
        let valueTemp = "";
        let nameTemp = "";
        let objTemp = Object.assign({}, value);
        const target = event.target;

        valueTemp = target.type === 'checkbox' ? target.checked : target.value;
        nameTemp = target.name;
        objTemp = Object.assign(objTemp, {[nameTemp]: valueTemp});

        setValue(objTemp);
    }

    const handleDeleteImg = (event) => {
        let idx = event.target.getAttribute("data-idx");
        let objTemp = Object.assign([], selectedImage);

        if(typeof objTemp[idx] !== "string") {
            setLimitImage(limitImage + 1);
        }

        objTemp.splice(idx, 1);

        setSelectedImage(objTemp);
    }

    const handleSelectedImg = (event) => {
        let idx = event.target.getAttribute("data-idx");
        let objTemp = Object.assign([], selectedImage);
        let idxTemp = Object.assign([], listIndexUpdate);

        if(idx) {
            objTemp[idx] = event.target.files[0];

            if(!idxTemp.includes(idx)) {
                idxTemp.push(idx);
            }

            setListIndexUpdate(idxTemp);
            setLimitImage(limitImage - 1);
        } else {
            if(event.target.files.length > 1) {
                Array.from(event.target.files).forEach(element => {
                    objTemp.push(element);
                })
            } else {
                objTemp.push(event.target.files[0]);
            }
        }

        setSelectedImage(objTemp);
        setLimitImage(limitImage - event.target.files.length);
    }

    const handleSubmit = async () => {
        setIsError(false);
        setIsLoading(true);
        let url = Api.API_GET_ADD_GALLERY;
        let method = "post";

        if(id) {
            url = Api.API_GET_EDIT_GALLERY.replace(":id", id);
            method = "put";
        }

        var bodyFormData = new FormData();
        bodyFormData.append('name', value.name);
        bodyFormData.append('description', value.description);
        if(selectedImage) {
            for (const key of Object.keys(selectedImage)) {
                bodyFormData.append('img', selectedImage[key]);
            }
        }
        if(listIndexUpdate.length > 0) {
            bodyFormData.append('index', JSON.stringify(listIndexUpdate));
        }
        
        try {
            await axios({
                method: method,
                url: url,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                navigate("/admin20220925" + routes.ROUTE_ADMIN_GALLERIES);
            })
            .catch(error => { setIsError(true) });
        } catch (error) {
            setIsError(true);
        }
        
        setIsLoading(false);
    }

    return (
        <>
            <div className="px-3 py-8 md:p-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <Card>
                            <CardHeader color="blue" className="px-3 pt-2">
                                <div className="w-full flex items-center justify-between">
                                    <h2 className="text-white text-2xl">{titlePage} Gallery</h2>
                                    <Button
                                        disabled={isLoading || mgsError !== ""}
                                        variant="text"
                                        size="lg"
                                        style={{ padding: 0, color: '#fff' }}
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    {(isError || mgsError) &&
                                        <div className='text-red-900'>{mgsError ?? "Error"}</div>
                                    }
                                    <div className="flex flex-wrap mt-2">
                                        <div className="w-full lg:w-12/12 font-light">
                                            <Input
                                                variant="standard"
                                                label="Name"
                                                name="name"
                                                defaultValue={value["name"]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="w-full lg:w-12/12 mt-4 font-light">
                                            <div className="flex flex-wrap">
                                                {selectedImage.map((item, idx) => {
                                                    return (
                                                        <div key={idx} className="w-14 border-2 border-white position-relative">
                                                            <i data-idx={idx}
                                                                className="fas fa-times-circle position-absolute top-0 right-0 z-10 cursor-pointer text-red-800 text-lg"
                                                                onClick={(e) => handleDeleteImg(e)}
                                                            ></i>
                                                            <Avatar
                                                                onClick={() => fileInput[idx].click()}
                                                                src={typeof item === "string" ? process.env.REACT_APP_UPLOAD_URL + "/" + item : URL.createObjectURL(item)}
                                                                className="cursor-pointer mt-3"
                                                            />
                                                            <input
                                                                data-idx={idx}
                                                                className="hidden"
                                                                type="file"
                                                                name="img[]"
                                                                ref={(el) => (fileInput[idx] = el)}
                                                                onChange={(event) => {
                                                                    handleSelectedImg(event);
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                                {selectedImage.length < 10 &&
                                                    <div className="w-14 border-2 border-white">
                                                        <Avatar
                                                            onClick={() => fileInput[11].click()}
                                                            src={ImgDefault}
                                                            className={`cursor-pointer ${selectedImage.length !== 0 ? "mt-3" : ""}`}
                                                        />
                                                        <input
                                                            className="hidden"
                                                            type="file"
                                                            name="img[]"
                                                            multiple
                                                            ref={(el) => (fileInput[11] = el)}
                                                            onChange={(event) => {
                                                                handleSelectedImg(event);
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mt-4 font-light">
                                        <Textarea 
                                            variant="standard" 
                                            label="Description" 
                                            name="description"
                                            value={value["description"]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
