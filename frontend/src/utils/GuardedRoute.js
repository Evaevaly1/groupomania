import React, {useContext} from 'react';
import { Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./AuthContext";

const GuardedRoute = () => {
    const {auth} = useContext(AuthContext);
    if (!auth.isLogged) {
        localStorage.clear();
    }
    return auth.isLogged ? <Outlet/> : <Navigate to="/" />
}

export default GuardedRoute;
