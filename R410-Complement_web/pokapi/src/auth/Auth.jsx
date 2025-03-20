import {Outlet} from "react-router";

function Auth() {
    return (
        <>
            <h1>Authentification :</h1>
            <Outlet />
        </>
    )
}

export default Auth;