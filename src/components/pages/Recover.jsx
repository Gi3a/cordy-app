import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";

import { toast } from 'react-toastify';

import { setUser } from "../../store/features/user/userSlice";
import { setLoad } from "../../store/features/load/loadSlice";


import Paws from '../../assets/images/icons/paws.svg';

import axios from 'axios';
import Button from "../ui/Button/Button";

const Recover = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { token } = useParams();

    const defVals = {
        token: token,
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        defaultValues: defVals
    });

    const handleLoading = () => {
        dispatch(setLoad());
    }

    const onSubmit = async (data) => {
        handleLoading();
        await axios({
            method: "post",
            url: "https://cordy-app.herokuapp.com/new_password",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                toast.success("Новый пароль сохранен", {
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
                navigate('/login');
            })
            .catch(function (error) {
                toast.warn(`Ошибка ${error}`, {
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
                <h1>Новый пароль</h1>

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

                <input
                    type="hidden"
                    name="token"
                    {...register("token", {})}
                />

                <div className="form-control">
                    <Button type="submit" text="Сохранить" flag="true" />
                </div>
            </form >
            <img src={Paws} alt="Paws" className="paws" />
        </div>
    )
}

export default Recover