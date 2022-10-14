import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import PetsList from '../common/Pet/PetsList';
import UserBar from '../common/User/UserBar';

const User = () => {

    const { user_id } = useParams();
    const { id, jwttoken } = useAuth();
    let navigate = useNavigate();
    const my_profile = parseInt(user_id) === parseInt(id);

    const [profile, setProfile] = useState({
        id: null,
        login: null,
        name: null,
        phoneNumber: null,
        mail: null,
        address: null,
        avatar: null,
        ranking: null,
        feedbacks: [],
        cats: [],
        favorites: [],
        username: null
    });

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${user_id}`
        })
            .then(function (response) {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    id: response.data.id,
                    login: response.data.login,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    mail: response.data.mail,
                    address: response.data.address,
                    avatar: response.data.avatar,
                    ranking: response.data.ranking,
                    feedbacks: response.data.feedbacks,
                    cats: response.data.cats,
                    favorites: response.data.favorites,
                    username: response.data.username
                }));
            })
            .catch(function (error) {
                navigate('/error/404');
            })
    }, [navigate])


    return (
        <div className="page">
            <UserBar user={profile} my_profile={my_profile} />
            <PetsList pets={profile.cats} />
        </div>
    )
}

export default User