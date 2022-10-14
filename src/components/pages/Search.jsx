import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from "../hooks/useAuth";

const Search = () => {

    const { id, jwttoken } = useAuth();

    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
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
                console.log(response);
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

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="name"
                    placeholder="Введит поиск запроса"
                    {...register("name")}
                />
            </form>
        </div>
    )
}

export default Search