import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, type, onClick, className, id, flag, title, children }) => {

    let outline;
    if (flag)
        outline = `${styles.outline}`;

    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${styles.button} ${className} ${outline}`}
            title={title}
        >
            {children}
            {text}
        </button>
    )
}

export default Button