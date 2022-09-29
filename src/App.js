import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './assets/styles/general.scss'

import Layout from './components/layouts/Layout';

import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Error from './components/pages/Error';
import ProtectedRoutes from './components/common/ProtectedRoutes';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Error />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
