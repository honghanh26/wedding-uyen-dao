import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardBody, Button, Input, Textarea } from '@material-tailwind/react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import * as routes from '../../../routes';
import * as Api from '../../../Api';

export default function UsersForm() {
    const navigate = useNavigate();
    const [story, setStory] = useState({});
    const [value, setValue] = useState({});
    const [storyDate, setStoryDate] = useState(new Date());
    registerLocale('vi', vi)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
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
                    Api.API_GET_STORY.replace(":id", id),
                );
                
                if(result.data.data.length > 0) {
                    setStory(result.data.data[0]);
                } else {
                    setStory({});
                }
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if(Object.keys(story).length > 0) {
            setValue({
                name: story.name,
                description: story.description
            });
            setStoryDate(new Date(story.date));
        }
    }, [story]);

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
        let url = Api.API_GET_ADD_STORY;
        let method = "post";

        if(id) {
            url = Api.API_GET_EDIT_STORY.replace(":id", id);
            method = "put";
        }

        let body = {
            name: value.name,
            description: value.description,
            date: storyDate
        }

        try {
            await axios({
                method: method,
                url: url,
                data: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                navigate("/admin20220925" + routes.ROUTE_ADMIN_STORIES);
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
                                    <h2 className="text-white text-2xl">{titlePage} Story</h2>
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
                                            <DatePicker selected={storyDate} onChange={(date) => setStoryDate(date)} locale="vi" />
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
