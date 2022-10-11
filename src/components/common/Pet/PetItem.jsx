import React from "react";
import { Link } from 'react-router-dom';

import styles from "./Pet.module.scss";

const PetItem = ({ id, name, address, age, breed, certificates, info, passport, photo, price, sex, vaccination }) => {
    return (
        <div className={styles.pet_item}>
            <Link to={`/pet/${id}`}>
                {name}
            </Link>
        </div>
    )
}

export default PetItem