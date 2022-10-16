import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { toast } from 'react-toastify';

import { setUser } from "../../store/features/user/userSlice";
import { setLoad } from "../../store/features/load/loadSlice";

import Paws from '../../assets/images/icons/paws.svg';

import axios from 'axios';
import Button from "../ui/Button/Button";

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

    const handleLoading = () => {
        dispatch(setLoad());
    }

    const onSubmit = async (data) => {
        handleLoading();
        await axios({
            method: "post",
            url: "https://cordy-app.herokuapp.com/authenticate",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
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
                    feedbacks: response.data.feedbacks,
                    favorites: response.data.favorites,
                    cats: response.data.cats
                }));
                handleLoading();
                navigate('/');
            })
            .catch(function (error) {
                toast.warn(`Неправильный логин или пароль ${error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                handleLoading();
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
                                value: 4,
                                message: "Пароль состоит минимум из 4 символов"
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className="form-control">
                    <Link to="/signup">
                        Нет аккаунта? Зарегестрируйтесь
                    </Link>
                </div>

                <div className="form-control">
                    <Button type="submit" text="Войти" flag="true" />
                </div>
            </form >
            <img src={Paws} alt="Paws" className="paws" />
        </div>
    )
}

export default Login