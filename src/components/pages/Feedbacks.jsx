import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import axios from 'axios';

import { useAuth } from "../hooks/useAuth";
import { setLoad } from "../../store/features/load/loadSlice";

import FeedbackList from "../common/Feedback/FeedbackList";
import Button from '../ui/Button/Button';

const Feedbacks = () => {

    const { user_id } = useParams();
    const { id, jwttoken } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoading = () => {
        dispatch(setLoad());
    }

    useEffect(() => {
        handleLoading();
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            url: `https://cordy-app.herokuapp.com/users/${user_id}/feedbacks`
        })
            .then(function (response) {
                setFeedbacks(...feedbacks, response.data);
                handleLoading();
            })
            .catch(function (error) {
                handleLoading();
                navigate('/error/404');
            })
    }, []);

    return (
        <div className="page">
            <FeedbackList feedbacks={feedbacks} />
            {parseInt(user_id) !== parseInt(id) &&
                <Button text="Оставить отзыв" onClick={() => navigate(`/${user_id}/feedback_add`)} />
            }
        </div>
    )
}

export default Feedbacks