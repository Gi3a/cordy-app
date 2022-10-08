import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";


const CreateReview = () => {

    const { user_id } = useParams();
    const { isAuth, jwttoken } = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/users/${user_id}/feedbacks`,
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                console.log(response.data)

            })
            .catch(function (error) {
                toast(error)
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Добавить отзыв</h1>

                <div className="form-control">
                    <label>Текст</label>
                    <input
                        type="text"
                        name="text"
                        {...register("text", {
                            required: "Проверьте текст",
                            minLength: {
                                value: 3,
                                message: "Текст должен состоять минимум из 3 символов"
                            }
                        })}
                    />
                    {errors.text && <span>{errors.text.message}</span>}
                </div>

                <div className="form-control">
                    <label>Оценка {rating}</label>
                    <input
                        type="range"
                        name="rating"
                        min="1"
                        max="5"
                        value={rating}
                        {...register("rating", {
                            required: "Проверьте рейтинг",
                        })}
                        onChange={(event) => setRating(event.target.value)}
                    />
                    {errors.rating && <span>{errors.rating.message}</span>}
                </div>



                <div className="form-control">
                    <button type="submit">
                        Отправить
                    </button>
                </div>
            </form >
        </div>
    )
}

export default CreateReview