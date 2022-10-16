import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { toast } from 'react-toastify';

import { setUser } from "../../store/features/user/userSlice";
import { setLoad } from "../../store/features/load/loadSlice";

import Paws from '../../assets/images/icons/paws.svg';

import axios from 'axios';
import Button from "../ui/Button/Button";

const Forgot = () => {

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
            url: "https://cordy-app.herokuapp.com/restore",
            headers: { "Content-Type": "application/json" },
            data: data
        })
            .then(function (response) {
                toast.success("Ссылка для восстановления выслана на почту", {
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
                navigate('/');
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
                <h1>Восстановление пароля</h1>

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
                    <Link to="/login">
                        Вспомнили пароль - Войдите
                    </Link>
                </div>

                <div className="form-control">
                    <Button type="submit" text="Отправить" flag="true" />
                </div>
            </form >
            <img src={Paws} alt="Paws" className="paws" />
        </div>
    )
}

export default Forgot