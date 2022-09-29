import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/features/user/userSlice";

import axios from 'axios';

const Login = () => {

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
            url: "https://cordy-app.herokuapp.com/authenticate",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                console.log(response.data)
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
                console.log(error)
            })
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Вход</h1>

                <div className="form-control">
                    <label>Логин</label>
                    <input
                        type="text"
                        name="username"
                        {...register("username", {
                            required: "Проверьте логин",
                            minLength: {
                                value: 3,
                                message: "Логин состоит минимум из 3 символов"
                            }
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>

                <div className="form-control">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        {...register("password", {
                            required: "Проверьте пароль",
                            minLength: {
                                value: 6,
                                message: "Пароль состоит минимум из 6 символов"
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className="form-control">
                    <button type="submit">
                        Войти
                    </button>
                </div>
            </form >
        </div>
    )
}

export default Login