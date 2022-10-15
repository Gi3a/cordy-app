import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from "../hooks/useAuth";
import Button from '../ui/Button/Button';

import { FaSearch, FaFilter } from "react-icons/fa";

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
                <div className="form-control form-search">
                    <Button id={"btn_filter"} text={<FaFilter />} />
                    <input
                        type="text"
                        name="name"
                        placeholder="Введит поиск запроса. Например: Балийская кошка или Турецкий ван..."
                        {...register("name")}
                    />
                    <Button id={"btn_search"} text={<FaSearch />} type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Search