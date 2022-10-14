import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.button}
        >
            {text}
        </button>
    )
}

export default Button