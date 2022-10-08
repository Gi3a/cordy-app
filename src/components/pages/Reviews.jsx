import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";


const Reviews = () => {

    const { user_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${user_id}/feedbacks`
        })
            .then(function (response) {
                setReviews(...reviews, response.data)
            })
            .catch(function (error) {
                // navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <h2>Отзывы</h2>
            {reviews.map(({ id, user_id, date, text, name, avatar, rating }) => {
                return (
                    <div className="pet">
                        <img src={avatar} />
                        <span>{name}</span>
                        <p>{text}</p>
                        <i>{rating}</i>
                    </div>
                );
            })}
        </div>
    )
}

export default Reviews