import React, { useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import Button from "../../ui/Button/Button";

import styles from "./Pet.module.scss";
import PetItem from "./PetItem";

const PetList = ({ pets, my_pets, my_favourties }) => {

    const { id, jwttoken } = useAuth();
    let navigate = useNavigate();

    const owner_id = id;
    const owner_token = jwttoken;

    return (
        <div className={styles.pet_list}>
            {pets.length > 0 ?
                <>
                    <h2>Питомцы</h2>
                    {pets.map(({
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
                        vaccination
                    }) => {
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
                                owner_id={owner_id}
                                owner_token={owner_token}
                            />
                        );
                    })}
                </>
                :
                <div className="message">
                    <h1>Нет питомцев</h1>
                    {my_pets &&
                        <>
                            <p>Добавьте своих питомцев</p>
                            <Button text="Добавить питомца" flag="true" onClick={() => navigate("/pet")} />
                        </>
                    }
                    {my_favourties &&
                        <p>Добавляйте в избранное понравившихся питомцев</p>
                    }
                </div>
            }
        </div>
    )
}

export default PetList