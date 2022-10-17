import React from 'react'
import { Routes, Route } from 'react-router-dom'


import Layout from './components/layouts/Layout';

import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Forgot from './components/pages/Forgot';
import Recover from './components/pages/Recover';
import User from './components/pages/User';
import Search from './components/pages/Search';
import Feedbacks from './components/pages/Feedbacks';
import Pet from './components/pages/Pet';
import Favorites from './components/pages/Favorites';
import PetAdd from './components/pages/PetAdd';
import Pets from './components/pages/Pets';
import FeedbackAdd from './components/pages/FeedbackAdd';
import UserEdit from './components/pages/UserEdit';
import Error from './components/pages/Error';

import ProtectedRoutes from './components/common/ProtectedRoutes';
import ProtectedRoutesAuth from './components/common/ProtectedRoutesAuth';
import PetEdit from './components/pages/PetEdit';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route element={<ProtectedRoutesAuth />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot" element={<Forgot />} />
                        <Route path="/confirm/:token" element={<Recover />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Search />} />
                        <Route path="/:user_id" element={<User />} />
                        <Route path="/pet" element={<PetAdd />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/:user_id/feedbacks" element={<Feedbacks />} />
                        <Route path="/pet/:pet_id" element={<Pet />} />
                        <Route path="/pets/:user_id" element={<Pets />} />
                        <Route path="/pets/:pet_id/edit" element={<PetEdit />} />
                        <Route path="/profile/edit" element={<UserEdit />} />
                        <Route path="/:user_id/feedback_add" element={<FeedbackAdd />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                    <Route path="/error/:type_error" element={<Error />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
