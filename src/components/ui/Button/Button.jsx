import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, type, onClick, className, id, flag, title, children, smll }) => {

    let outline = "";
    let small = "";
    if (flag)
        outline = `${styles.outline}`;
    if (smll)
        small = `${styles.small}`;

    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${styles.button} ${className} ${outline} ${small}`}
            title={title}
        >
            {children}
            {text}
        </button>
    )
}

export default Button