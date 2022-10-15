import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';
import PetList from '../common/Pet/PetsList';

import { useAuth } from "../hooks/useAuth";

const Pets = () => {

    const { user_id } = useParams();
    const { id, jwttoken } = useAuth();

    let navigate = useNavigate();
    const [pets, setPets] = useState([]);

    let belong = false;

    if (parseInt(id) === parseInt(user_id))
        belong = true;

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${user_id}/cats`
        })
            .then(function (response) {
                setPets(...pets, response.data)
            })
            .catch(function (error) {
                navigate('/error/404');
            })
    }, [user_id, navigate]);

    return (
        <div className="page">
            <PetList pets={pets} belong={belong} />
        </div>
    )
}

export default Pets