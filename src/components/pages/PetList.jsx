import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";

const PetList = () => {

    const { user_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [pets, setPets] = useState([]);

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
    }, []);

    return (
        <div className="page">
            {pets.length > 0
                ?
                pets.map(({ id, name, address, age, breed, certificates, info, passport, photo, price, sex, vaccination }) => {
                    return (
                        <Link to={`/pet/${id}`} className="pet" key={id}>
                            name: {name} <br />
                        </Link>
                    );
                })
                :
                <><h2>Нет питомцев</h2></>
            }
        </div>
    )
}

export default PetList