import React from "react";
import { Link } from 'react-router-dom';

import styles from "./User.module.scss";

const UserItem = ({ id, login, name, phoneNumber, mail, address, avatar, ranking }) => {
    return (
        <div className={styles.user_item}>
            <Link to={`/${id}`}>
                {name}
            </Link>
        </div>
    )
}

export default UserItem