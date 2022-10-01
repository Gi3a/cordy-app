import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './assets/styles/general.scss'

import Layout from './components/layouts/Layout';

import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import CreateCat from './components/pages/CreateCat';
import Error from './components/pages/Error';

import ProtectedRoutes from './components/common/ProtectedRoutes';
import ProtectedRoutesAuth from './components/common/ProtectedRoutesAuth';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route element={<ProtectedRoutesAuth />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/:user_id" element={<Profile />} />
                        <Route path="/create/cat" element={<CreateCat />} />
                    </Route>

                    <Route path="*" element={<Error />} />

                </Route>
            </Routes>
        </>
    );
}

export default App;
