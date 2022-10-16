import React, { useEffect, useState } from 'react'
import styles from "./Load.module.scss";
import { useDispatch } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

import { setLoad } from "../../../store/features/load/loadSlice";

const delay = 5;

const Load = () => {

    const dispatch = useDispatch();

    const handleLoading = () => {
        dispatch(setLoad());
    }

    useEffect(
        () => {
            let timer1 = setTimeout(() => handleLoading(), delay * 1000);
            return () => {
                clearTimeout(timer1);
            };
        },

        []
    );

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