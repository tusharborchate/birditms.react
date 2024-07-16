import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const ProtectedRoute: React.FC = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('jwt') == null || sessionStorage.getItem('jwt') == undefined) {
            navigate('/login');
        }

    });

    return (
        <React.Fragment>
        { !!sessionStorage.getItem('jwt')  &&
        (
            <Outlet />
        )}
        </React.Fragment>
        
    );


}

export default ProtectedRoute;