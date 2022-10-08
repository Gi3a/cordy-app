import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";


const Pet = () => {

    const { pet_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();


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
        count_feedback: null
    });

    useEffect(() => {
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
                }));
            })
            .catch(function (error) {
                navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <h2>Питомец</h2>
            <div className="block">
                GET Cat Id: {pet.id}
                Pet name : {pet.name}
            </div>
            <Link to={`/${pet.owner_id}`} className="pet">
                Owner name: {pet.owner_name} <br />
            </Link>
        </div>
    )
}

export default Pet