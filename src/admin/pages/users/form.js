import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Select, Option, Avatar } from '@material-tailwind/react';
import UserContext from '../../../UserContext';
import * as Api from '../../../Api';
import ImgDefault from '../../assets/img/default-thumbnail.jpeg';

export default function UsersForm() {
    const { users } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [value, setValue] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fileInput = useRef();
    const focusFileInput = () => fileInput.current.click();
    let { id } = useParams();
    let titlePage = "Add";

    if(id) {
        titlePage = "Edit";
    }

    let image = ImgDefault;
    if(user?.img?.data) {
        const blob = new Blob([Int8Array.from(user.img.data.data)], {type: user.img.contentType });
        image = window.URL.createObjectURL(blob);
    }

    useEffect(() => {
        let userTemp = users.find(item => item.id === id);

        if(userTemp && Object.keys(userTemp).length > 0) {
            setValue({
                name: userTemp.name,
                description: userTemp.description,
                role: userTemp.role
            });
        }

        setUser(userTemp);
    }, [users, id]);

    const handleChange = (event) => {
        let valueTemp = "";
        let nameTemp = "";
        let objTemp = Object.assign({}, value);

        if(typeof event === "string") {
            valueTemp = event;
            nameTemp = "role";
        } else {
            const target = event.target;
            valueTemp = target.type === 'checkbox' ? target.checked : target.value;
            nameTemp = target.name;
        }

        objTemp = Object.assign(objTemp, {[nameTemp]: valueTemp});

        setValue(objTemp);
    }
    
    const handleSubmit = async () => {
        setIsError(false);
        setIsLoading(true);
        let url = Api.API_GET_ADD_USER;
        let method = "post";

        if(id) {
            url = Api.API_GET_EDIT_USER.replace(":id", id);
            method = "put";
        }

        var bodyFormData = new FormData();
        bodyFormData.append('name', value.name);
        bodyFormData.append('description', value.description);
        bodyFormData.append('role', value.role);
        bodyFormData.append('img', selectedImage);

        try {
            await axios({
                method: method,
                url: url,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => console.log(response.data))
            .catch(error => { setIsError(true) });

            // setData(result.data.data);
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
                                    <h2 className="text-white text-2xl">{titlePage} User</h2>
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
                                        <div className="w-full lg:w-12/12 mt-4 font-light">
                                            <Select
                                                variant="standard" 
                                                label="Select Role" 
                                                value={value["role"]} 
                                                onChange={handleChange}
                                            >
                                                <Option value="husband">Husband</Option>
                                                <Option value="wife">Wife</Option>
                                                <Option value="father">Father</Option>
                                                <Option value="mother">Mother</Option>
                                                <Option value="brother">Brother</Option>
                                                <Option value="sister">Sister</Option>
                                            </Select>
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
