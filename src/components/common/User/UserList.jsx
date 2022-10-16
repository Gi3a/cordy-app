import React from "react";
import { Link } from 'react-router-dom';
import styles from "./User.module.scss";
import UserItem from "./UserItem";

const UserList = ({ users }) => {
    return (
        <div className={styles.pet_list}>
            {users?.length > 0 ?
                <>
                    <h2>Пользователи</h2>
                    {pets.map(({ id, login, name, phoneNumber, mail, address, avatar, ranking }) => {
                        return (
                            <UserItem
                                key={id}
                                id={id}
                                login={login}
                                name={name}
                                phoneNumber={phoneNumber}
                                mail={mail}
                                address={address}
                                avatar={avatar}
                                ranking={ranking}
                            />
                        );
                    })}
                </>
                :
                <h2>Нет пользователей</h2>
            }
        </div>
    )
}

export default UserList