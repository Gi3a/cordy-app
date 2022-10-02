import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/features/user/userSlice";

import { toast } from 'react-toastify';

import axios from 'axios';

const Signup = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

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
            url: "https://cordy-app.herokuapp.com/signUp",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                console.log(response.data);
                dispatch(setUser({
                    jwttoken: response.data.jwttoken,
                    id: response.data.id,
                    login: response.data.login,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    mail: response.data.mail,
                    address: response.data.address,
                    avatar: response.data.avatar,
                    ranking: response.data.ranking,
                }));
                navigate('/');
            })
            .catch(function (error) {
                toast(error);
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Регистрация</h1>

                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        name="mail"
                        {...register("mail", {
                            required: "Заполните email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный mail. Пример: example@mail.com"
                            },
                        })}
                    />
                    {errors.mail && <span>{errors.mail.message}</span>}
                </div>

                <div className="form-control">
                    <label>Логин</label>
                    <input
                        type="text"
                        name="login"
                        {...register("login", {
                            required: "Проверьте логин",
                            minLength: {
                                value: 3,
                                message: "Логин состоит минимум из 3 символов"
                            }
                        })}
                    />
                    {errors.login && <span>{errors.login.message}</span>}
                </div>

                <div className="form-control">
                    <label>Имя</label>
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
                    <label>Номер телефона</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        {...register("phoneNumber", {
                            required: "Проверьте номер телефона",
                            minLength: {
                                value: 7,
                                message: "Номер телефона состоит минимум из 7 символов"
                            }
                        })}
                    />
                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                </div>

                <div className="form-control">
                    <label>Адресс</label>
                    <input
                        type="text"
                        name="address"
                        {...register("address", {
                            required: "Проверьте номер телефона",
                            minLength: {
                                value: 5,
                                message: "Адресс состоит минимум из 5 символов"
                            }
                        })}
                    />
                    {errors.address && <span>{errors.address.message}</span>}
                </div>

                <div className="form-control">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        {...register("password", {
                            required: "Заполните пароль",
                            minLength: {
                                value: 6,
                                message: "Пароль должен иметь минимум 6 символов"
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className="form-control">
                    <button type="submit">
                        Зарегестрироваться
                    </button>
                </div>
            </form >
        </div>
    )
}

export default Signup