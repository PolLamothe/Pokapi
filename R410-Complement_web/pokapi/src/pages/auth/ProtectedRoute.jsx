import {Navigate, Outlet, useNavigate} from "react-router";
import pokapiDAO from "../../dao/pokapiDAO.js";
import {useEffect} from "react";

function ProtectedRoute({ redirectPath = '/auth/login' }) {
    const navigate = useNavigate();

    useEffect(() => {
        pokapiDAO.fetchAuthentication().then(isAuthenticated => {
            if (!isAuthenticated) {
                return navigate(redirectPath);
            }
        }).catch(e => {
            console.log(`AUTH >> Authentication failed ${e.message}`);
            return navigate(redirectPath);
        })
    });

    return <Outlet />;
}

export default ProtectedRoute;