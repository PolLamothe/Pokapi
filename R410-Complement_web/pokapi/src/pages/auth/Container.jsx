function Cont({children}){

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {children}
            </div>
        </div>
    )
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

export default Cont;