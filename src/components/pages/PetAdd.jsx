import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from "../hooks/useAuth";
import { setLoad } from "../../store/features/load/loadSlice";
import { setCats } from "../../store/features/user/userSlice";

import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';

const PetAdd = () => {


    const { id, jwttoken } = useAuth();

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const handleLoading = () => {
        dispatch(setLoad());
    }

    useEffect(() => {
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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

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
                toast.success("Фотография добавлена", {
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
            method: "post",
            url: `https://cordy-app.herokuapp.com/users/${id}/cats`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                toast.success("Питомец добавлен", {
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
                onImageUpdate(cat_id);
                dispatch(setCats(response.data))
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
                <h1>Добавить питомца</h1>

                <div className="form-control">
                    <label>Имя питомца</label>
                    <input
                        type="text"
                        name="name"
                        {...register("name", {
                            required: "Проверьте имя",
                            minLength: {
                                value: 3,
                                message: "Имя состоит минимум из 3 символов"
                            }
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="form-control">
                    <label>Пол питомца</label>

                    <select
                        name="sex"
                        {...register("sex", {
                            required: "Проверьте пол",
                        })}
                    >
                        <option value="">Выберите пол...</option>
                        <option value="true">Женский</option>
                        <option value="false">Мужской</option>
                    </select>
                    {errors.sex && <span>{errors.sex.message}</span>}
                </div>

                <div className="form-control">
                    <label>Порода питомца</label>
                    <input
                        type="text"
                        name="breed"
                        {...register("breed", {
                            required: "Проверьте породу",
                            minLength: {
                                value: 2,
                                message: "Порода состоит минимум из 2 символов"
                            }
                        })}
                    />
                    {errors.breed && <span>{errors.breed.message}</span>}
                </div>

                <div className="form-control">
                    <label>Возраст питомца</label>
                    <input
                        type="number"
                        name="age"
                        {...register("age", {
                            required: "Проверьте возраст",
                            minLength: {
                                value: 1,
                                message: "Возраст минимум из 1 символов"
                            }
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div className="form-control">
                    <label>Стоимость питомца</label>
                    <input
                        type="number"
                        name="price"
                        {...register("price", {
                            required: "Проверьте стоимость",
                            minLength: {
                                value: 1,
                                message: "Возраст минимум из 1 символов"
                            }
                        })}
                    />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>Паспорт питомца</label>
                    <input
                        type="checkbox"
                        name="passport"
                        {...register("passport",)}
                    />
                    {errors.passport && <span>{errors.passport.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>Вакцинация питомца</label>
                    <input
                        type="checkbox"
                        name="vaccination"
                        {...register("vaccination",)}
                    />
                    {errors.vaccination && <span>{errors.vaccination.message}</span>}
                </div>

                <div className="form-control form-bool">
                    <label>Вакцинация питомца</label>
                    <input
                        type="checkbox"
                        name="certificates"
                        {...register("certificates",)}
                    />
                    {errors.certificates && <span>{errors.certificates.message}</span>}
                </div>

                <div className="form-control">
                    <label>Описание</label>
                    <input
                        type="text"
                        name="info"
                        {...register("info", {
                            required: "Проверьте описание",
                            minLength: {
                                value: 2,
                                message: "Описание состоит минимум из 2 символов"
                            }
                        })}
                    />
                    {errors.info && <span>{errors.info.message}</span>}
                </div>

                <div className="form-control ">
                    <label>Фотография питомца</label>

                    <input
                        type="file"
                        name="file"
                        {...register("file"
                            , { required: "Проверьте фотографию", }
                        )}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file && file.type.substr(0, 5) === "image")
                                setImage(file);
                            else
                                setImage(null);
                        }}
                    />
                    {preview ? <img src={preview} alt="preview" /> : <></>}

                    {errors.file && <span>{errors.file.message}</span>}
                </div>


                <div className="form-control">
                    <Button type="submit" text="Добавить питомца" flag="true" />
                </div>
            </form >
        </div>
    )
}

export default PetAdd