import React from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import styles from "./Pet.module.scss";

import { MdPets, MdLocationPin } from "react-icons/md";
import { FaRubleSign, FaHeart, FaTimes, FaRegHeart, FaRegEdit } from "react-icons/fa";

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
    owner_id,
    owner_token,
    owner_address
}) => {

    let navigate = useNavigate();

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
                    <span><MdLocationPin />{owner_address} {address}</span>
                </div>
            </Link>
        </div>
    )
}

export default PetItem