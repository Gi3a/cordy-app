import React from "react";
import styles from "./Pet.module.scss";

const PetBar = (pet) => {
    const { id,
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
        address,
        owner_id,
        owner_phoneNumber,
        owner_mail,
        owner_address,
        owner_ranking,
        owner_name,
        count_feedback } = pet.pet;
    return (
        <div className={styles.pet_bar}>
            <h2>Питомец</h2>
            {name}
            <img src={`${photo}`} alt="photo" />
        </div>
    )
}

export default PetBar