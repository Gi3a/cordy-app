import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";

const PetList = () => {

    const { user_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { pets, setPets } = useState([]);

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
                console.log(response.data)
                setPets(prevPets => [
                    ...prevPets,
                    response.data
                ])
            })
            .catch(function (error) {
                // navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            {/* {pets.map((pet) => {
                return (
                    <div>
                        id: ${pet.id} <br />
                    </div>
                );
            })} */}
        </div>
    )
}

export default PetList