import { Outlet } from "react-router";
import pokapiLogo from "../../assets/pokapi-logo.png";
import {useNavigate} from "react-router";
import Cont from "./Container.jsx";

function Auth() {
    const navigate = useNavigate();
    return (
        <Cont>
            
                <img 
                    src={pokapiLogo} 
                    alt="Pokapi Logo" 
                    style={logoStyle} 
                    onClick={() => navigate("/")}
                />
                <Outlet />
        </Cont>
    );
}



const logoStyle = {
    height: "150px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
    cursor: "pointer"
}

export default Auth;
