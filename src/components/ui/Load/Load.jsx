import React from 'react'
import styles from "./Load.module.scss";
import { ProgressBar } from "react-loader-spinner";

const Load = () => {
    return (
        <div className={styles.load}>
            <ProgressBar
                height="120"
                width="120"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
            />
        </div>
    )
}

export default Load