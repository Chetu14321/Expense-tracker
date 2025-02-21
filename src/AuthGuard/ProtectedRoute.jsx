import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppProvider";

function ProtectedRoute(props) {
    const { isLogin, token } = useContext(AppContext)

    return (
        <React.Fragment>
            {
                token && isLogin ? <Outlet/> : <Navigate to={'/login'} />
            }
        </React.Fragment>
    )
} 

export default ProtectedRoute