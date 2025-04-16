import {Flex} from "@radix-ui/themes";

function Cont({children, height="100vh"}){

    return (
        <Flex height={height} align="center" justify="center" style={containerStyle}>
            <Flex p="6" direction="column" bg="gray.500" width="calc(100vw - 32px)" maxWidth="420px" align="center" style={cardStyle}>
                {children}
            </Flex>
        </Flex>
    )
}

const containerStyle = {
    backgroundColor: "#f8f8f8"
};

const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "var(--shadow-4)",
};

export default Cont;