import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from "../../store/features/user/userSlice";

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";
import { unsetUser } from '../../store/features/user/userSlice';

const ProfileEdit = () => {
    const { id, isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();



    const [profile, setProfile] = useState({
        login: null,
        name: null,
        phoneNumber: null,
        mail: null,
        address: null,
        avatar: null,
        ranking: null,
        feedbacks: [],
        cats: [],
        favorites: [],
        username: null
    });

    const preloadValues = {
        login: "giza@mail.ru"
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        defaultValues: preloadValues
    });

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${id}`
        })
            .then(function (response) {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    login: response.data.login,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    mail: response.data.mail,
                    address: response.data.address,
                    avatar: response.data.avatar,
                    ranking: response.data.ranking,
                    feedbacks: response.data.feedbacks,
                    cats: response.data.cats,
                    favorites: response.data.favorites,
                    username: response.data.username
                }));
            })
            .catch(function (error) {
                navigate('/error/404');
            })
    }, []);

    const onSubmit = async (data) => {
        await axios({
            method: "post",
            url: "https://cordy-app.herokuapp.com/authenticate",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                console.log(response.data)
                dispatch(setUser({
                    jwttoken: response.data.jwttoken,
                    id: response.data.id,
                    login: response.data.login,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    mail: response.data.mail,
                    address: response.data.address,
                    avatar: response.data.avatar,
                    ranking: response.data.ranking,
                }));
                navigate('/');
            })
            .catch(function (error) {
                toast(error)
            })
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Редактирование профиля</h1>

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

                <div className="form-control">
                    <button type="submit">
                        Сохранить
                    </button>
                    <button>
                        Удалить аккаунт
                    </button>
                </div>
            </form >
        </div>
    )
}

export default ProfileEdit