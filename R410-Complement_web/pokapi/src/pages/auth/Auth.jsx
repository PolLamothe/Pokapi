import { Outlet } from "react-router";
import pokapiLogo from "../../assets/pokapi-logo.png";
import Cont from "./Container.jsx";

function Auth() {
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
    height: "150px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
}

export default Auth;
