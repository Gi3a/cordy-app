import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import PetList from '../common/Pet/PetsList';

const Favorites = () => {

    const { id, jwttoken } = useAuth();
    const [favourites, setFavourites] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${id}/favourites`
        })
            .then(function (response) {
                setFavourites(...favourites, response.data)
            })
            .catch(function (error) {
                // navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <PetList pets={favourites} />
        </div>
    )
}

export default Favorites