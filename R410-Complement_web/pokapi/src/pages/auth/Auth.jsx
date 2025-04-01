import { Outlet } from "react-router";
import pokapiLogo from "../../assets/pokapi-logo.png";
import {useNavigate} from "react-router";

function Auth() {
    const navigate = useNavigate();
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <img 
                    src={pokapiLogo} 
                    alt="Pokapi Logo" 
                    style={logoStyle} 
                    onClick={() => navigate("/")}
                />
                <Outlet />
            </div>
        </div>
    );
}

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8"
};

const cardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "350px",
    maxWidth: "420px",
    width: "30%"
};

const logoStyle = {
    height: "150px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
    cursor: "pointer"
}

export default Auth;
