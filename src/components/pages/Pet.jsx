import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import PetBar from '../common/Pet/PetBar';
import { setLoad } from "../../store/features/load/loadSlice";

const Pet = () => {

    const { pet_id } = useParams();
    const { id, jwttoken } = useAuth();

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoading = () => {
        dispatch(setLoad());
    }


    const [pet, setPet] = useState({
        id: null,
        name: null,
        sex: null,
        breed: null,
        age: null,
        price: null,
        passport: null,
        vaccination: null,
        certificates: null,
        info: null,
        photo: null,
        address: null,
        owner_id: null,
        owner_phoneNumber: null,
        owner_mail: null,
        owner_address: null,
        owner_ranking: null,
        owner_name: null,
        count_feedback: null,
        owner_avatar: null,
        liked: null
    });

    useEffect(() => {
        handleLoading();
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/cats/${pet_id}`
        })
            .then(function (response) {
                setPet(prevPet => ({
                    ...prevPet,
                    id: response.data.id,
                    name: response.data.name,
                    sex: response.data.sex,
                    breed: response.data.breed,
                    age: response.data.age,
                    price: response.data.price,
                    passport: response.data.passport,
                    vaccination: response.data.vaccination,
                    certificates: response.data.certificates,
                    info: response.data.info,
                    photo: response.data.photo,
                    address: response.data.address,
                    owner_id: response.data.owner_id,
                    owner_phoneNumber: response.data.owner_phoneNumber,
                    owner_mail: response.data.owner_mail,
                    owner_address: response.data.owner_address,
                    owner_ranking: response.data.owner_ranking,
                    owner_name: response.data.owner_name,
                    count_feedback: response.data.count_feedback,
                    owner_avatar: response.data.owner_avatar,
                    liked: response.data.liked
                }));
                handleLoading();
            })
            .catch(function (error) {
                handleLoading();
                navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <PetBar pet={pet} my_id={id} my_token={jwttoken} />
        </div>
    )
}

export default Pet