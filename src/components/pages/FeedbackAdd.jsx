import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useAuth } from "../hooks/useAuth";


const FeedbackAdd = () => {

    const { id, jwttoken } = useAuth();
    const { user_id } = useParams();
    let navigate = useNavigate();

    const [rating, setRating] = useState(0);

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const preloadedValues = {
        userId: id,
        date: date
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        defaultValues: preloadedValues
    });


    const onSubmit = async (data) => {

        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/users/${user_id}/feedbacks`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                console.log(response.data)
                toast.success("Отзыв добавлен", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(`/${user_id}/reviews`);
            })
            .catch(function (error) {
                toast.warn(error.response, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Добавить отзыв</h2>

                <input
                    type="hidden"
                    name="userId"
                    {...register("userId", {})}
                />

                <input
                    type="hidden"
                    name="date"
                    {...register("date", {})}
                />

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

export default FeedbackAdd