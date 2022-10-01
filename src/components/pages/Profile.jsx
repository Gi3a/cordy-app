import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";

const Profile = () => {

    const { user_id } = useParams();
    const { jwttoken } = useAuth();
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
        getProfile();
    }, [])

    const getProfile = async () => {
        await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${user_id}`
        })
            .then(function (response) {
                console.log(response.data)
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
                console.log(profile)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className="page">
            <div>GET User Id: {user_id}</div>
            <div>Profile login : {profile.login}</div>
        </div>
    )
}

export default Profile