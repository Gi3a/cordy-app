import React from 'react'
import { Routes, Route } from 'react-router-dom'


import Layout from './components/layouts/Layout';

import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Search from './components/pages/Search';
import Favorites from './components/pages/Favorites';
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
                        <Route path="/pet" element={<CreateCat />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                    <Route path="/error/:type_error" element={<Error />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
