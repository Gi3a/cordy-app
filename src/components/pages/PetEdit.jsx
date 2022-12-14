import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from "../hooks/useAuth";
import { setLoad } from "../../store/features/load/loadSlice";

import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';

const PetEdit = () => {

    const { pet_id } = useParams();
    const { id, jwttoken, cats } = useAuth();


    const dispatch = useDispatch();
    let navigate = useNavigate();

    const pet_from_local = cats.filter(cat => parseInt(cat.id) === parseInt(pet_id))[0];

    const [pet, setPet] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        defaultValues: pet_from_local,
    });

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const handleLoading = () => {
        dispatch(setLoad());
    }

    useEffect(() => {
        // const loadPet = async () => {
        //     handleLoading();
        //     await axios({
        //         method: "get",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${jwttoken}`
        //         },
        //         url: `https://cordy-app.herokuapp.com/cats/${pet_id}`
        //     })
        //         .then(function (response) {
        //             setPet(response.data);
        //             handleLoading();
        //         })
        //         .catch(function (error) {
        //             handleLoading();
        //             navigate('/error/404');
        //         })
        // }
        // loadPet();
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const onImageUpdate = async (cat_id) => {

        const fd = new FormData();
        fd.append("file", image, image.name);

        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/cats/${cat_id}/photo`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: fd
        })
            .then(function (response) {
                toast.success("???????????????????? ??????????????????", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(`/pets/${id}`);
            })
            .catch(function (error) {
                toast.warn(error.response, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    const onSubmit = async (data) => {
        handleLoading();
        await axios({
            method: "put",
            url: `https://cordy-app.herokuapp.com/users/${id}/cats/${pet_id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                toast.success("?????????????? ??????????????", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const cat_id = response.data.id;
                if (image)
                    onImageUpdate(cat_id);
                handleLoading();
            })
            .catch(function (error) {
                toast.warn(error.response, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                handleLoading();
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>???????????????? ??????????????</h2>

                <div className="form-control">
                    <label>?????? ??????????????</label>
                    <input
                        type="text"
                        name="name"
                        {...register("name", {
                            required: "?????????????????? ??????",
                            minLength: {
                                value: 3,
                                message: "?????? ?????????????? ?????????????? ???? 3 ????????????????"
                            }
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="form-control">
                    <label>?????? ??????????????</label>

                    <select
                        name="sex"
                        {...register("sex", {
                            required: "?????????????????? ??????",
                        })}
                    >
                        <option value="">???????????????? ??????...</option>
                        <option value="true">??????????????</option>
                        <option value="false">??????????????</option>
                    </select>
                    {errors.sex && <span>{errors.sex.message}</span>}
                </div>

                <div className="form-control">
                    <label>???????????? ??????????????</label>
                    <input
                        type="text"
                        name="breed"
                        {...register("breed", {
                            required: "?????????????????? ????????????",
                            minLength: {
                                value: 2,
                                message: "???????????? ?????????????? ?????????????? ???? 2 ????????????????"
                            }
                        })}
                    />
                    {errors.breed && <span>{errors.breed.message}</span>}
                </div>

                <div className="form-control">
                    <label>?????????????? ??????????????</label>
                    <input
                        type="number"
                        name="age"
                        {...register("age", {
                            required: "?????????????????? ??????????????",
                            minLength: {
                                value: 1,
                                message: "?????????????? ?????????????? ???? 1 ????????????????"
                            }
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div className="form-control">
                    <label>?????????????????? ??????????????</label>
                    <input
                        type="number"
                        name="price"
                        {...register("price", {
                            required: "?????????????????? ??????????????????",
                            minLength: {
                                value: 1,
                                message: "?????????????? ?????????????? ???? 1 ????????????????"
                            }
                        })}
                    />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>?????????????? ??????????????</label>
                    <input
                        type="checkbox"
                        name="passport"
                        {...register("passport",)}
                    />
                    {errors.passport && <span>{errors.passport.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>???????????????????? ??????????????</label>
                    <input
                        type="checkbox"
                        name="vaccination"
                        {...register("vaccination",)}
                    />
                    {errors.vaccination && <span>{errors.vaccination.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>???????????????????? ??????????????</label>
                    <input
                        type="checkbox"
                        name="certificates"
                        {...register("certificates",)}
                    />
                    {errors.certificates && <span>{errors.certificates.message}</span>}
                </div>

                <div className="form-control">
                    <label>????????????????</label>
                    <input
                        type="text"
                        name="info"
                        {...register("info", {
                            required: "?????????????????? ????????????????",
                            minLength: {
                                value: 2,
                                message: "???????????????? ?????????????? ?????????????? ???? 2 ????????????????"
                            }
                        })}
                    />
                    {errors.info && <span>{errors.info.message}</span>}
                </div>

                <div className="form-control ">
                    <label>???????????????????? ??????????????</label>

                    <input
                        type="file"
                        name="file"
                        {...register("file")}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file && file.type.substr(0, 5) === "image")
                                setImage(file);
                            else
                                setImage(null);
                        }}
                    />
                    {pet_from_local.photo ? <img src={pet_from_local.photo} alt="preview_Local" /> : <></>}
                    {preview ? <img src={preview} alt="preview" /> : <></>}

                    {errors.file && <span>{errors.file.message}</span>}
                </div>


                <div className="form-control">
                    <Button type="submit" text="???????????????? ??????????????" flag={true} />
                </div>
            </form >
        </div>
    )
}

export default PetEdit