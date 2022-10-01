import React from 'react'
import { useForm } from "react-hook-form";

import axios from 'axios';

import { useAuth } from "../hooks/use-auth";

const CreateCat = () => {


    const { jwttoken } = useAuth();

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
            url: "https://cordy-app.herokuapp.com/users/2/cats",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwttoken}`
            },
            data: data
        })
            .then(function (response) {
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Добавить питомца</h1>

                <div className="form-control">
                    <label>Имя питомца</label>
                    <input
                        type="text"
                        name="name"
                        {...register("name", {
                            required: "Проверьте имя",
                            minLength: {
                                value: 3,
                                message: "Имя состоит минимум из 3 символов"
                            }
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="form-control">
                    <label>Пол питомца</label>

                    <select
                        name="sex"
                        {...register("sex", {
                            required: "Проверьте пол",
                        })}
                    >
                        <option value="">Выберите пол...</option>
                        <option value="true">Женский</option>
                        <option value="false">Мужской</option>
                    </select>
                    {errors.sex && <span>{errors.sex.message}</span>}
                </div>

                <div className="form-control">
                    <label>Порода питомца</label>
                    <input
                        type="text"
                        name="breed"
                        {...register("breed", {
                            required: "Проверьте породу",
                            minLength: {
                                value: 2,
                                message: "Порода состоит минимум из 2 символов"
                            }
                        })}
                    />
                    {errors.breed && <span>{errors.breed.message}</span>}
                </div>

                <div className="form-control">
                    <label>Возраст питомца</label>
                    <input
                        type="number"
                        name="age"
                        {...register("age", {
                            required: "Проверьте возраст",
                            minLength: {
                                value: 1,
                                message: "Возраст минимум из 1 символов"
                            }
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div className="form-control">
                    <label>Возраст питомца</label>
                    <input
                        type="number"
                        name="age"
                        {...register("age", {
                            required: "Проверьте возраст",
                            minLength: {
                                value: 1,
                                message: "Возраст минимум из 1 символов"
                            }
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div className="form-control">
                    <label>Паспорт питомца</label>
                    <input
                        type="checkbox"
                        name="passport"
                        {...register("passport",)}
                    />
                    {errors.passport && <span>{errors.passport.message}</span>}
                </div>

                <div className="form-control">
                    <label>Вакцинация питомца</label>
                    <input
                        type="checkbox"
                        name="vaccination"
                        {...register("vaccination",)}
                    />
                    {errors.vaccination && <span>{errors.vaccination.message}</span>}
                </div>

                <div className="form-control">
                    <label>Вакцинация питомца</label>
                    <input
                        type="checkbox"
                        name="certificates"
                        {...register("certificates",)}
                    />
                    {errors.certificates && <span>{errors.certificates.message}</span>}
                </div>


                <div className="form-control">
                    <button type="submit">
                        Добавить Питомца
                    </button>
                </div>
            </form >
        </div>
    )
}

export default CreateCat