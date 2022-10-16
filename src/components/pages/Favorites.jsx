import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import { setLoad } from "../../store/features/load/loadSlice";
import PetList from '../common/Pet/PetsList';

const Favorites = () => {

    const { id, jwttoken } = useAuth();
    const [favourites, setFavourites] = useState([]);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoading = () => {
        dispatch(setLoad());
    }

    useEffect(() => {
        handleLoading();
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${id}/favourites`
        })
            .then(function (response) {
                setFavourites(...favourites, response.data);
                handleLoading();
            })
            .catch(function (error) {
                handleLoading();
                navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <PetList pets={favourites} my_favourties={true} />
        </div>
    )
}

export default Favorites