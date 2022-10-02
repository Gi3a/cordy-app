import React from 'react'
import { Outlet } from 'react-router-dom'

import '../../assets/styles/general.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header'

const Layout = () => {
    return (
        <main>
            <Header />
            <Outlet />
            <ToastContainer />
        </main>
    )
}

export default Layout