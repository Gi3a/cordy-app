import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { setUser } from "../../store/features/user/userSlice";
import { setLoad } from "../../store/features/load/loadSlice";

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import Button from '../ui/Button/Button';

const UserEdit = () => {
    const { id, jwttoken, avatar } = useAuth();
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLoading = () => {
        dispatch(setLoad());
    }


    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(avatar);
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
        mode: "onBlur",
        defaultValues: useAuth()
    });

    const onImageUpdate = async (event) => {
        const fd = new FormData();
        if (image)
            fd.append("file", image, image.name);


        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/users/${id}/avatar`,
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
                navigate(`/${id}`);
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
            url: `https://cordy-app.herokuapp.com/users/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                dispatch(setUser({
                    jwttoken: jwttoken,
                    id: response.data.id,
                    login: response.data.login,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    mail: response.data.mail,
                    address: response.data.address,
                    avatar: response.data.avatar,
                    ranking: response.data.ranking,
                    feedbacks: response.data.feedbacks,
                    favorites: response.data.favorites,
                    cats: response.data.cats
                }));
                toast.success("Данные сохранены", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                if (image)
                    onImageUpdate();
                else
                    navigate(`/${id}`);
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
    };

    return (<div className="page">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Редактирование профиля</h2>

            <div className="form-control">
                <label>Имя</label>
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
                <label>Адрес</label>
                <input
                    type="text"
                    name="address"

                    {...register("address", {
                        required: "Проверьте номер телефона",
                        minLength: {
                            value: 5,
                            message: "Адресс состоит минимум из 5 символов"
                        }
                    })}
                />
                {errors.address && <span>{errors.address.message}</span>}
            </div>

            <div className="form-control">
                <label>Номер телефона</label>
                <input
                    type="tel"
                    name="phoneNumber"

                    {...register("phoneNumber", {
                        required: "Проверьте номер телефона",
                        minLength: {
                            value: 7,
                            message: "Номер телефона состоит минимум из 7 символов"
                        },
                    })}
                />
                {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
            </div>

            <div className="form-control">
                <label>Email</label>
                <input
                    type="text"
                    name="mail"

                    {...register("mail", {
                        required: "Заполните email",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Некорректный mail. Пример: example@mail.com"
                        },
                    })}
                />
                {errors.mail && <span>{errors.mail.message}</span>}
            </div>

            <div className="form-control ">
                <label>Аватар</label>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    // onChange={onImageUpdate}
                    onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                            setImage(file);
                        }
                        else
                            setImage(null);
                    }}
                />
                {preview ? <img src={preview} alt="preview" /> : <></>}

                {errors.avatar && <span>{errors.avatar.message}</span>}
            </div>

            <div className="form-control">
                <Button type="submit" text="Сохранить" flag="true" />
            </div>
        </form >
    </div>
    );
}

export default UserEdit