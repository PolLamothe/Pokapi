import {useNavigate, useParams} from "react-router";
import {useState, useEffect} from "react";
import {Box, Button, Flex, IconButton, Text} from "@radix-ui/themes";
import pokapiDAO from "../dao/pokapiDAO.js";
import {Undo2} from "lucide-react";

function Card() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [quantity, setQuantity] = useState(0)
    let [loaded, setLoaded] = useState(false);
    let navigateToChat = useNavigate()
    let navigateBack = useNavigate()


    useEffect(() => {
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setQuantity(data.quantity);
            setLoaded(true);
        })
    }, [params.cardId]);
    return (
        <>
            {loaded ? (
                <Flex
                    direction={{base: "column", md: "row"}}
                    justify="center"
                    align="center"
                    gap="6"
                    px="6"
                    py="6"
                    style={{fontFamily: "Arial, sans-serif"}}
                >
                    <IconButton radius="full"  size="3" style={{position: "fixed", top: "180px", left: "30px", backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)"}} onClick={()=>navigateBack(-1)}>
                        <Undo2/>
                    </IconButton>
                    <Box
                        p="9"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignSelf: "stretch",
                        }}
                    >
                        <img
                            src={cardData.set?.images?.logo || "placeholder.png"}
                            alt="Logo"
                            style={{width: "300px", marginBottom: "20px"}}
                        />
                        <Flex direction="row" align="center" gap="4">
                            <Box
                                p="2"
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "bold",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "25px",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                                    width: "75px",
                                    height: "35px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text size="3">{cardData.set?.ptcgoCode || "Unknown"}</Text>
                            </Box>
                            <Text size="3" style={{textAlign: "left"}}>
                                {cardData.number || "Unknown"}
                                <strong>/</strong>
                                {cardData.set?.total || "Unknown"}
                            </Text>
                        </Flex>
                        <Flex direction="column" align="center" gap="2" px="4" py="2">
                            <Text size="3" style={{textAlign: "left", width: "100%"}}>
                                <strong>Illustrator:</strong> {cardData.artist || "Unknown"}
                            </Text>
                            <Text size="3" style={{textAlign: "left", width: "100%"}}>
                                <strong>Price:</strong> {cardData.cardmarket?.prices?.averageSellPrice || "N/A"}
                            </Text>
                        </Flex>
                        <Flex justify="center" >
                            <Button variant="soft" radius="full" style={{boxShadow: "0px 0px 5px 1px grey"}} onClick={() => {navigateToChat(`/chatpokemon/${cardData.id}`)}}>Chat with the Pokemon</Button>
                        </Flex>
                    </Box>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="4"
                        style={{textAlign: "center"}}
                    >
                        <img
                            src={cardData.images?.large || "placeholder.png"}
                            alt={cardData.name || "Card"}
                            style={{
                                width: "300px",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                            }}
                        />
                        <Box
                            p="4"
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            <Flex direction="row" align="center" gap="4">
                                <Text size="2"><strong>Number:</strong> {cardData.number || "N/A"}</Text>
                                <Text size="2">{cardData.name || "Unknown Card"}</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );


}

export default Card;