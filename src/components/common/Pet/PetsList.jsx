import React from "react";

import { useAuth } from "../../hooks/useAuth";

import styles from "./Pet.module.scss";
import PetItem from "./PetItem";

const PetList = ({ pets }) => {

    const { id, jwttoken, cats, favorites } = useAuth();

    const owner_id = id;
    const owner_token = jwttoken;

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
                                liked={
                                    favorites.find(obj => {
                                        return parseInt(obj.id) === parseInt(id);
                                    })
                                }
                                belong={
                                    cats.find(obj => {
                                        return parseInt(obj.id) === parseInt(id);
                                    })
                                }
                                owner_id={owner_id}
                                owner_token={owner_token}
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