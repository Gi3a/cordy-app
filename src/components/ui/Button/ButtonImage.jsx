import React from "react";
import styles from "./Button.module.scss";

const ButtonImage = ({ text, type, onClick, className, id }) => {
    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${styles.button} ${className}`}
        >
            {text}
        </button>
    )
}

export default ButtonImage