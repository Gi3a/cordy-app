import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { setLoad } from "../../store/features/load/loadSlice";

import axios from 'axios';
import PetList from '../common/Pet/PetsList';

import { useAuth } from "../hooks/useAuth";

const Pets = () => {

    const { user_id } = useParams();
    const { id, jwttoken } = useAuth();
    const dispatch = useDispatch();

    let navigate = useNavigate();
    const [pets, setPets] = useState([]);

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
            url: `https://cordy-app.herokuapp.com/users/${user_id}/cats`
        })
            .then(function (response) {
                setPets(...pets, response.data);
                handleLoading();
            })
            .catch(function (error) {
                navigate('/error/404');
                handleLoading();
            })
    }, [user_id, navigate]);

    return (
        <div className="page">
            <PetList pets={pets} />
        </div>
    )
}

export default Pets