import {Outlet, useNavigate} from "react-router";
import pokapiLogo from "../../assets/pokapi-logo.png";
import Cont from "../../components/Container.jsx";
import {useEffect} from "react";
import pokapiDAO from "../../dao/pokapiDAO.js";

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        pokapiDAO.fetchAuthentication().then(isAuthenticated => {
            if (isAuthenticated) {
                return navigate("/");
            }
        }).catch(e => {
            console.log(`AUTH >> Authentication failed ${e.message}`);
        })
    });

    return (
        <Cont>
            <img
                src={pokapiLogo}
                alt="Pokapi Logo"
                style={logoStyle}
            />
            <Outlet />
        </Cont>
    );
}

const logoStyle = {
    height: "auto",
    width: "100%",
    maxWidth: "300px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
}

export default Auth;
