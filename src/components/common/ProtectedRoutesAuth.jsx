import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"


const ProtectedRoutesAuth = () => {
    const { isAuth } = useAuth();

    return isAuth ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoutesAuth