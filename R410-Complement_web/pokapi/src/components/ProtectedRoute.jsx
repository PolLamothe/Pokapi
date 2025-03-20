import {Navigate, Outlet} from "react-router";

function ProtectedRoute({ redirectPath = '/auth/login' }) {
    const isAuthenticated = true; // TODO: checkIfUserIsAuthenticated()

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;