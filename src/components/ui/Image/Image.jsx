import React from 'react';
import styles from "./Image.module.scss";

const Image = ({ src, className, children }) => {
    return (
        <div className={`${styles.image} ${className}`} >
            <img src={src} alt="img" />
            {children}
        </div >
    )
}

export default Image