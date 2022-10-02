import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";
import { unsetUser } from '../../store/features/user/userSlice';

const Profile = () => {

    const { user_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [profile, setProfile] = useState({
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
    }, [])


    return (
        <div className="page">
            <div>GET User Id: {user_id}</div>
            <div>Profile login : {profile.login}</div>
            {isAuth &&
                <button onClick={() => dispatch(unsetUser())}>
                    Log out
                </button>
            }
        </div>
    )
}

export default Profile