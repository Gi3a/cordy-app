import React from "react";
import Button from "../../ui/Button/Button";
import styles from "./Pet.module.scss";

const PetBar = (pet) => {
    const {
        // id,
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
        owner_mail,
        owner_address,
        owner_ranking,
        owner_name,
        count_feedback
    } = pet.pet;
    return (
        <>
            <div className={styles.pet_bar}>
                <div className={styles.pet_photo}>
                    <img src={`${photo}`} alt="pet_photo" />
                    <Button text="Позвонить" onClick={() => window.location = `tel:${owner_mail}`} />
                    <Button text="Написать email" onClick={() => window.location = `mailto:${owner_mail}`} />
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
            <div className={styles.owner_bar}>
                <div className={styles.owner_avatar}>
                    <img src={`https://cordy-app.herokuapp.com/avatars/${owner_id}`} alt="owner avatar" />
                </div>
                <div className={styles.owner_description}>
                    <div>
                        {owner_name}
                    </div>
                    <div>
                        {owner_ranking}
                        {count_feedback}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PetBar