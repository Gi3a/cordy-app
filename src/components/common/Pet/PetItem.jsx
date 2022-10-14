import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import styles from "./Pet.module.scss";

import { MdPets, MdLocationPin } from "react-icons/md";
import { FaRubleSign, FaHeart, FaTimes, FaRegHeart } from "react-icons/fa";

const PetItem = ({
    id,
    name,
    address,
    age,
    breed,
    certificates,
    info,
    passport,
    photo,
    price,
    sex,
    vaccination,
    liked,
    belong,
    owner_id,
    owner_token }) => {

    let navigate = useNavigate();

    const handleFavourite = () => {
        console.log("liked");
    }

    useEffect(() => {

    }, [navigate])

    const handleDelete = async () => {

        await axios({
            method: "delete",
            url: `https://cordy-app.herokuapp.com/users/${owner_id}/cats/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${owner_token}`
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
                navigate(`/pets/${owner_id}`);
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
        <div className={styles.pet_item}>
            <Link to={`/pet/${id}`} >
                <div className={styles.pet_item_avatar}>
                    <img src={`${photo}`} alt="pet_photo" />
                </div>
                <div className={styles.pet_item_description}>
                    <span>{name}</span>
                    <span><FaRubleSign />{price}</span>
                    <span><MdPets />{breed}</span>
                    <span><MdLocationPin />{address}</span>
                </div>
            </Link>
            <span
                className={styles.pet_like}
                onClick={handleFavourite}
                title="🧡 Like"
            >
                {liked ?
                    <FaHeart color="red" />
                    :
                    <FaRegHeart />
                }
            </span>

            {belong &&
                <span
                    className={styles.pet_delete}
                    onClick={handleDelete}
                    title="🗑️ Delete"
                >
                    <FaTimes />
                </span>
            }
        </div>
    )
}

export default PetItem