import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Pet.module.scss";
import PetItem from "./PetItem";

const PetList = ({ pets }) => {
    return (
        <div className={styles.pet_list}>
            {pets.length > 0 ?
                <>
                    <h2>Питомцы</h2>
                    {pets.map(({ id, name, address, age, breed, certificates, info, passport, photo, price, sex, vaccination }) => {
                        return (
                            <PetItem
                                key={id}
                                id={id}
                                name={name}
                                address={address}
                                age={age}
                                breed={breed}
                                certificates={certificates}
                                info={info}
                                passport={passport}
                                photo={photo}
                                price={price}
                                sex={sex}
                                vaccination={vaccination}
                            />
                        );
                    })}
                </>
                :
                <h2>Нет питомцев</h2>
            }
        </div>
    )
}

export default PetList