import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from "../hooks/useAuth";
import { setLoad } from "../../store/features/load/loadSlice";
import Button from '../ui/Button/Button';

import { FaSearch, FaFilter } from "react-icons/fa";
import PetList from '../common/Pet/PetsList';

const Search = () => {

    const { id, jwttoken } = useAuth();

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [pets, setPets] = useState([]);



    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    const handleLoading = () => {
        dispatch(setLoad());
    }

    const onSubmit = async (data) => {
        handleLoading();
        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/cats/filter`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                console.log(response.data);
                setPets(response.data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="search">
                <div className="form-control form-search">
                    <input
                        type="text"
                        name="search"
                        placeholder="Введит поиск запроса. Например: Балийская кошка"
                        {...register("search")}
                    />
                    <Button id={"btn_search"} text={<FaSearch />} type="submit" flag={true} />
                </div>
            </form>
            <PetList pets={pets} />
        </div>
    )
}

export default Search