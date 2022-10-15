import React from "react";
import { useDispatch } from 'react-redux';


import Button from "../../ui/Button/Button";
import ButtonImage from "../../ui/Button/ButtonImage"
import styles from "./User.module.scss";
import { useNavigate } from 'react-router-dom';
import { unsetUser } from '../../../store/features/user/userSlice';

const UserBar = ({ user, my_profile }) => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const { id, login, name, phoneNumber, mail, address, avatar, ranking } = user;

    return (
        <div className={styles.user_bar}>
            <div className={styles.user_avatar}>
                <img src={`${avatar}`} alt="avatar" />
                <Button text="Отзывы" onClick={() => navigate(`/${id}/feedbacks`)} />
                {my_profile &&
                    <>
                        <Button text="Редактировать профиль" onClick={() => navigate("/profile/edit")} />
                        <Button text="Выйти из аккаунта" onClick={() => dispatch(unsetUser())} />
                    </>
                }
            </div>
            <div className={styles.user_description}>
                <span><b>Логин:</b> {login}</span>
                <span><b>Имя:</b> {name}</span>
                <span><b>Номер телефона:</b> {phoneNumber}</span>
                <span><b>Email:</b> {mail}</span>
                <span><b>Адрес:</b> {address}</span>
                <span><b>Ранг:</b> {ranking}</span>
            </div>
        </div>
    )
}

export default UserBar