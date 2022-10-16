import React, { useState, useEffect } from "react";
import Button from "../../ui/Button/Button";
import styles from "./Pet.module.scss";

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';

import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "../../ui/Image/Image";

const PetBar = (pet) => {
    const {
        id,
        name,
        sex,
        breed,
        age,
        price,
        passport,
        vaccination,
        certificates,
        info,
        photo,
        owner_id,
        owner_phoneNumber,
        owner_avatar,
        liked,
        owner_mail,
        owner_address,
        owner_ranking,
        owner_name,
        count_feedback
    } = pet.pet;

    const [like, setLike] = useState(liked);
    let navigate = useNavigate();

    useEffect(() => {
        setLike(liked);
    }, [liked])

    const handleLike = async () => {
        await axios({
            method: "post",
            url: `https://cordy-app.herokuapp.com/users/${pet.my_id}/favourites`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${pet.my_token}`
            },
            data: { id: id }
        })
            .then(function (response) {
                setLike(true);
                toast.success("Питомец добавлен в избранное", {
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

    const handleUnlike = async () => {
        await axios({
            method: "delete",
            url: `https://cordy-app.herokuapp.com/users/${pet.my_id}/favourites/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${pet.my_token}`
            }
        })
            .then(function (response) {
                setLike(false);
                toast.success("Питомец убран из избранного", {
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

    const handleDelete = async () => {

        await axios({
            method: "delete",
            url: `https://cordy-app.herokuapp.com/users/${pet.my_id}/cats/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${pet.my_token}`
            }
        })
            .then(function (response) {
                toast.success("Питомец удален", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(`/pets/${pet.my_id}`);
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
        <>
            <div className={styles.owner_bar}>
                <Image src={`${owner_avatar}`} className={styles.owner_avatar} />
                <div className={styles.owner_description}>
                    <div>
                        <span><b>Владелец:</b>{owner_name}</span>
                    </div>
                    <div>
                        <span><b>Ранг:</b>{owner_ranking}</span>
                        <span><b>Количество фидбеков:</b>{count_feedback}</span>
                    </div>
                </div>
            </div>
            <div className={styles.pet_bar}>

                <div className={styles.pet_photo}>
                    <img src={`${photo}`} alt="pet_photo" />
                    {parseInt(parseInt(pet.my_id) === parseInt(owner_id)) ?
                        <div className={styles.buttons}>
                            <Button text="Позвонить" onClick={() => window.location = `tel:${owner_mail}`} />
                            <Button text="Написать email" onClick={() => window.location = `mailto:${owner_mail}`} />
                            {like ?
                                <Button
                                    title="🧡 Liked"
                                    text={<FaHeart color="red" />}
                                    onClick={handleUnlike}
                                />
                                :
                                <Button
                                    onClick={handleLike}
                                    title="🧡 Like"
                                    text={<FaRegHeart />}
                                />
                            }
                        </div>
                        :
                        <div className={styles.buttons}>
                            <Button text="Редактировать" onClick={() => navigate(`/pets/${id}/edit`)} />
                            <Button text="Удалить" onClick={handleDelete} />
                        </div>
                    }
                </div>
                <div className={styles.pet_description}>
                    <span><b>Имя:</b>{name}</span>
                    <span><b>Порода:</b> {breed}</span>
                    <span><b>Возраст:</b> {age}</span>
                    <span><b>Пол:</b> {sex}</span>
                    <span><b>Стоимость:</b> {price}</span>
                    <span><b>Адрес:</b> {owner_address}</span>
                    <span><b>Паспорт:</b> {passport}</span>
                    <span><b>Вакцинация:</b> {vaccination}</span>
                    <span><b>Сертификаты:</b> {certificates}</span>
                    <span><p>{info}</p></span>
                </div>
            </div>
        </>
    )
}

export default PetBar