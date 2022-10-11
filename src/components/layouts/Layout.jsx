import React from 'react'
import { Outlet } from 'react-router-dom'

import '../../assets/styles/general.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
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