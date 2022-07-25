import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Avatar } from '@material-tailwind/react';
import * as routes from '../../../routes';
import * as Api from '../../../Api';
import ImgDefault from '../../assets/img/default-thumbnail.jpeg';

export default function UsersForm() {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [value, setValue] = useState({});
    const [image, setImage] = useState(ImgDefault);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fileInput = useRef();
    const focusFileInput = () => fileInput.current.click();
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
                    Api.API_GET_EVENT.replace(":id", id),
                );
                
                if(result.data.data.length > 0) {
                    setEvent(result.data.data[0]);
                } else {
                    setEvent({});
                }
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if(Object.keys(event).length > 0) {
            setValue({
                name: event.name,
                description: event.description,
                location: event.location,
                date: event.date
            });
            if(event?.img) {
                setImage(process.env.REACT_APP_UPLOAD_URL + "/" + event.img);
            }
        }
    }, [event]);

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
    
    const handleSubmit = async () => {
        setIsError(false);
        setIsLoading(true);
        let url = Api.API_GET_ADD_EVENT;
        let method = "post";

        if(id) {
            url = Api.API_GET_EDIT_EVENT.replace(":id", id);
            method = "put";
        }

        var bodyFormData = new FormData();
        bodyFormData.append('name', value.name);
        bodyFormData.append('description', value.description);
        bodyFormData.append('location', value.location);
        if(selectedImage) {
            bodyFormData.append('img', selectedImage);
        }

        try {
            await axios({
                method: method,
                url: url,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                navigate("/admin" + routes.ROUTE_ADMIN_EVENTS);
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
                                    <h2 className="text-white text-2xl">{titlePage} Event</h2>
                                    <Button
                                        disabled={isLoading}
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
                                    {isError &&
                                        <div className='text-red-900'>Error</div>
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
                                        <div className="w-full lg:w-12/12 mt-4 after:font-light">
                                            <Input
                                                variant="standard"
                                                label="Address"
                                                name="location"
                                                defaultValue={value["location"]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="w-full lg:w-12/12 mt-4 font-light">
                                            <div className="flex">
                                                <div className="w-14 h-14 border-2 border-white">
                                                    <Avatar
                                                        onClick={focusFileInput}
                                                        src={selectedImage ? URL.createObjectURL(selectedImage) : image}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                className="hidden"
                                                type="file"
                                                name="img"
                                                ref={fileInput}
                                                onChange={(event) => {
                                                    setSelectedImage(event.target.files[0]);
                                                }}
                                            />
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
