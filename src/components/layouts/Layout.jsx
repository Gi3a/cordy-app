import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import '../../assets/styles/general.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Load from "../ui/Load/Load";

import { setLoad } from "../../store/features/load/loadSlice";

const Layout = () => {

    const dispatch = useDispatch();
    const loadSelector = useSelector((state) => state.load.loadState);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {loadSelector && <Load />}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Layout