import React from "react";
import styles from "./User.module.scss";

const UserBar = (user) => {
    const { id, login, name, phoneNumber, mail, address, avatar, ranking } = user.user;
    return (
        <div className={styles.user_bar}>
            <h2>Профиль</h2>
            {name}
            <img src={`${avatar}`} alt="avatar" />
        </div>
    )
}

export default UserBar