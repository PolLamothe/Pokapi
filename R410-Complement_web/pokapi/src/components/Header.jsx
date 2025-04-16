import React, {useState, useEffect} from 'react';
import pokapiLogo from "../assets/pokapi-logo.png";
import {useNavigate} from "react-router";
import {Flex} from "@radix-ui/themes";

const Header = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //tout le responsif je sais pas faire avec un media query en react
    const surTablette = windowWidth < 1400;
    const surMobile = windowWidth < 800;

    const getButtonStyle = (isHovered, borderRadius) => ({
        ...buttonBaseStyle,
        background: isHovered ? "white" : "#64408D",
        color: isHovered ? "#64408D" : "white",
        borderRadius,
        minWidth: surMobile ? "80px" : surTablette ? "120px" : "175px",
        height: surMobile ? "50px" : surTablette ? "60px" : "70px",
        fontSize: surMobile ? "14px" : surTablette ? "18px" : "25px",
    });

    const dynamicLogoStyle = {
        ...logoStyle,
        height: surMobile ? "60px" : surTablette ? "120px" : "150px",
        width: surMobile ? "120px" : "auto",
    };

    const dynamicContainerStyle = {
        ...containerStyle,
        gap: surMobile ? "5px" : surTablette ? "10px" : "15px",
        padding: surMobile ? "10px" : "20px",
        width: surMobile ? "calc(100% - 20px)" : "calc(100% - 40px)"
    };



    return (
        !surMobile ? (
            <header style={dynamicContainerStyle}>
                <Flex direction="row" gap="2">
                    <button
                        style={getButtonStyle(hovered === 'cards', "50px 0 0 50px")}
                        onMouseEnter={() => setHovered('cards')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => navigate("/collection")}
                    >
                        Cards
                    </button>
                    <button
                        style={getButtonStyle(hovered === 'sets', "0 50px 50px 0")}
                        onMouseEnter={() => setHovered('sets')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => navigate("/sets")}
                    >
                        Sets
                    </button>
                </Flex>

                <img
                    src={pokapiLogo}
                    alt="Pokapi Logo"
                    style={dynamicLogoStyle}
                    onClick={() => navigate("/")}
                />

                <Flex direction="row" gap="2">
                    <button
                        style={getButtonStyle(hovered === 'home', "50px 0 0 50px")}
                        onMouseEnter={() => setHovered('home')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                    <button
                        style={getButtonStyle(hovered === 'account', "0 50px 50px 0")}
                        onMouseEnter={() => setHovered('account')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => navigate("/account")}
                    >
                        Account
                    </button>
                </Flex>
            </header>
        ) : (
            <header style={dynamicContainerStyle}>
                <Flex direction="column" align="center">
                    <img
                        src={pokapiLogo}
                        alt="Pokapi Logo"
                        style={dynamicLogoStyle}
                        onClick={() => navigate("/")}
                    />

                    <Flex direction="row" gap="2">
                        <button
                            style={getButtonStyle(hovered === 'cards', "50px 0 0 50px")}
                            onMouseEnter={() => setHovered('cards')}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => navigate("/collection")}
                        >
                            Cards
                        </button>
                        <button
                            style={getButtonStyle(hovered === 'sets', "0 50px 50px 0")}
                            onMouseEnter={() => setHovered('sets')}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => navigate("/sets")}
                        >
                            Sets
                        </button>

                        <button
                            style={getButtonStyle(hovered === 'home', "50px 0 0 50px")}
                            onMouseEnter={() => setHovered('home')}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </button>
                        <button
                            style={getButtonStyle(hovered === 'account', "0 50px 50px 0")}
                            onMouseEnter={() => setHovered('account')}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => navigate("/account")}
                        >
                            Account
                        </button>
                    </Flex>
                </Flex>
            </header>
        )
    );
};

const containerStyle = {
    margin: "0 auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Racing Sans One', sans-serif",
};

const buttonBaseStyle = {
    background: "#64408D",
    color: "white",
    padding: "10px",
    textTransform: "uppercase",
    fontWeight: "600",
    border: "2px solid #B42D5C",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
};

const logoStyle = {
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
    cursor: "pointer",
};

export default Header;
