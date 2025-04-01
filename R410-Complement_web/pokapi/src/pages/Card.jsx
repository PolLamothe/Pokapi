import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import pokapiDAO from "../dao/pokapiDAO.js";

function Card() {
  let params = useParams()

  let [cardData,setCardData] = useState({})
    let [quantity,setQuantity] = useState(0)
    let [loaded, setLoaded] = useState(false);

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
                <Flex direction="row" justify="center" align="center" gap="6" px="6" py="6" style={{ fontFamily: "Arial, sans-serif" }}>
                    <Box p="4" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <img src={cardData.set.images.logo || "placeholder.png"} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />
                        <Text size="2" style={{ marginBottom: "10px", textAlign: "center", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}>{cardData.set.ptcgocode || "Unknown"}</Text>
                        <Text size="2" style={{ marginBottom: "10px", textAlign: "center" }}>{cardData.number || "Unknown"}<strong>/</strong>{cardData.set.total || "Unknown"}</Text>
                        <Text size="2" style={{ marginBottom: "10px", textAlign: "center" }}><strong>Illustrator:</strong> {cardData.artist || "Unknown"}</Text>
                        <Text size="2" style={{ textAlign: "center" }}><strong>Price:</strong> {cardData.cardmarket.prices.averageSellPrice || "N/A"}</Text>
                    </Box>
                    <Flex direction="column" align="center" gap="4">
                        <img src={cardData.images.logo || "placeholder.png"} alt={cardData.name || "Card"} style={{ width: "300px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }} />
                        <Box p="4" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center", width: "100%" }}>
                            <Text size="2"><strong>Number:</strong> {cardData.quantity || "N/A"}</Text>
                            <Text size="2">{cardData.name || "Unknown Card"}</Text>
                        </Box>
                    </Flex>
                </Flex>
            ) : (
                <p>Loading</p>
            )}
        </>
    );

}

export default Card;