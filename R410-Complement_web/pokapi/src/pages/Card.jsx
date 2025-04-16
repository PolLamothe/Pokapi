import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import pokapiDAO from "../dao/pokapiDAO.js";
import { Undo2 } from "lucide-react";

function Card() {
    let params = useParams();

    let [cardData, setCardData] = useState({});
    let [quantity, setQuantity] = useState(0);
    let [loaded, setLoaded] = useState(false);
<<<<<<< Updated upstream
    let navigateToChat = useNavigate()
    let navigateBack = useNavigate()
    let navigateToSet = useNavigate()

=======
    let navigateToChat = useNavigate();
    let navigateBack = useNavigate();
>>>>>>> Stashed changes

    useEffect(() => {
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setQuantity(data.quantity);
            setLoaded(true);
        });
    }, [params.cardId]);
    return (
        <>
          {loaded ? (
            <Flex
              direction={{ base: "column", md: "row", lg: "row" }}
              justify="center"
              align="center"
              wrap="wrap"
              gap={{ base: "4", md: "6", lg: "8" }}
              px={{ base: "4", md: "6", lg: "8" }}
              py={{ base: "2", md: "4", lg: "6" }}
              style={{
                fontFamily: "Arial, sans-serif",
                minHeight: "100vh",
                position: "relative",
              }}
            >
              <IconButton
                radius="full"
                size={{ base: "2", md: "3", lg: "4" }}
                style={{
                  position: "fixed",
                  top: "20px",
                  left: "20px",
                  backgroundColor: "rgb(100, 64, 141)",
                  border: "1px solid rgb(180, 45, 92)",
                  zIndex: 1000,
                }}
                onClick={() => navigateBack(-1)}
              >
                <Undo2 />
              </IconButton>
      
              {/* Partie gauche */}
              <Flex
                p= "6"
                m={{ base: "4", md: "0", lg: "0" }}
                mt={{ base: "8", md: "0", lg: "0" }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  width: "100%",
                  maxWidth: { base: "100%", sm: "400px", md: "450px", lg: "500px" },
                  marginTop: { base: "60px", md: "0", lg: "0" }
                }}
                direction="column"
                justify="center"
              >
                <img
                  src={cardData.set?.images?.logo || "placeholder.png"}
                  alt="Logo"
                  style={{ 
                    width: "100%", 
                    maxWidth: { base: "300px", lg: "350px" },
                    margin: "0 auto 1rem auto",
                    paddingTop: "1rem"
                  }}
                />
                <Flex direction="row" align="center" gap={{ base: "4", lg: "6" }} wrap="wrap">
                  <Box
                    p={{ base: "3", md: "5", lg: "5" }}
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#ffffff",
                      borderRadius: "25px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                      minWidth: "75px",
                      height: "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text size={{ base: "2", md: "3", lg: "4" }}>{cardData.set?.ptcgoCode || "Unknown"}</Text>
                  </Box>
                  <Text size={{ base: "2", md: "3", lg: "4" }}>
                    {cardData.number || "Unknown"}<strong>/</strong>{cardData.set?.total || "Unknown"}
                  </Text>
                </Flex>
                <Flex direction="column" align="start" gap="2" py="2" px="1">
                  <Text size={{ base: "2", md: "3", lg: "4" }}>
                    <strong>Illustrator:</strong> {cardData.artist || "Unknown"}
                  </Text>
                  <Text size={{ base: "2", md: "3", lg: "4" }}>
                    <strong>Price:</strong> {cardData.cardmarket?.prices?.averageSellPrice || "N/A"} €
                  </Text>
                </Flex>
                <Flex justify="center" mt="4" mb="2">
                  <Button
                    variant="soft"
                    radius="full"
                    size={{ base: "1", md: "2", lg: "3" }}
                    style={{ 
                      boxShadow: "0px 0px 5px 1px grey",
                      width: "100%",
                      maxWidth: { base: "250px", lg: "300px" }
                    }}
                    onClick={() => {
                      navigateToChat(`/chatpokemon/${cardData.id}`);
                    }}
                  >
                    Chat with the Pokemon
                  </Button>
                </Flex>
              </Flex>
      
              {/* Partie droite */}
              <Flex
                direction="column"
                align="center"
                justify="center"
                style={{
                  textAlign: "center",
                  width: "100%",
                  maxWidth: { base: "100%", sm: "400px", md: "450px", lg: "500px" },
                  marginTop: { base: "2", md: "0", lg: "0" },
                  marginBottom: { base: "4", md: "0", lg: "0" },
                }}
              >
                <div 
                  className="card" 
                  style={{ 
                    position: "relative",
                    width: "100%",
                    maxWidth: { base: "300px", lg: "350px" },
                    marginTop: { base: "2", md: "2", lg: "4" }
                  }}
                >
<<<<<<< Updated upstream
                    <IconButton radius="full" size="3" style={{
                        position: "fixed",
                        top: "180px",
                        left: "30px",
                        backgroundColor: "rgb(100, 64, 141)",
                        border: "1px solid rgb(180, 45, 92)"
                    }} onClick={() => navigateBack(-1)}>
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
                            onClick={()=>navigateToSet(`/set/${cardData.set.id}`)}
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
                        <Flex justify="center">
                            <Button variant="soft" radius="full" style={{boxShadow: "0px 0px 5px 1px grey"}}
                                    onClick={() => {
                                        navigateToChat(`/chatpokemon/${cardData.id}`)
                                    }}>Chat with the Pokemon</Button>
                        </Flex>
                    </Box>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="4"
                        style={{textAlign: "center"}}
                    >
                        <div className="card">
                            {cardData.rarity.includes("Rare") ? (
                                <CardEffectHolo card={cardData}/>
                            ) : (
                                <CardEffect card={cardData}/>
                            )}
                        </div>
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
                <Flex align="center" direction="column" py="9">
                    <Spinner size="2"/>
                    Loading
                </Flex>
            )}
=======
                  {cardData.rarity.includes("Rare") ? (
                    <CardEffectHolo card={cardData} />
                  ) : (
                    <CardEffect card={cardData} />
                  )}
                </div>
                <Box
                  mt="4"
                  mb={{ base: "6", md: "0", lg: "0" }}
                  p= "4"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: { base: "350px", lg: "400px" },
                    marginBottom: { base: "60px", lg: "0" },
                  }}
                >
                  <Flex 
                    direction={{ base: "column", sm: "row" }} 
                    align="center" 
                    m = "10px"
                    gap= "4"
                    justify="center"
                  >
                    <Text size={{ base: "2", md: "3", lg: "4" }}><strong>Number:</strong> {cardData.number || "N/A"}</Text>
                    <Text size={{ base: "2", md: "3", lg: "4" }}>{cardData.name || "Unknown Card"}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <Flex 
              align="center" 
              justify="center" 
              direction="column" 
              style={{ 
                minHeight: "100vh" 
              }}
            >
              <Spinner size="3" />
              <Text mt="4" size="2">Loading card data...</Text>
            </Flex>
          )}
>>>>>>> Stashed changes
        </>
      );
}

function CardEffect({ card }) {
    const boundingRef = useRef(null);
    const [glowStyle, setGlowStyle] = useState({});

    const handleMouseEnter = (ev) => {
        boundingRef.current = ev.currentTarget.getBoundingClientRect();
    };

    const handleMouseLeave = (ev) => {
        boundingRef.current = null;
        ev.currentTarget.style.removeProperty("--x-rotation");
        ev.currentTarget.style.removeProperty("--y-rotation");
        ev.currentTarget.style.removeProperty("--x");
        ev.currentTarget.style.removeProperty("--y");
        setGlowStyle({});
    };

    const handleMouseMove = (ev) => {
        if (!boundingRef.current) return;

        const { left, top, width, height } = boundingRef.current;
        const x = ev.clientX - left;
        const y = ev.clientY - top;

        const xPercent = x / width;
        const yPercent = y / height;

        const xRotation = (xPercent - 0.5) * 20;
        const yRotation = (0.5 - yPercent) * 20;

        const el = ev.currentTarget;
        el.style.setProperty("--x-rotation", `${yRotation}deg`);
        el.style.setProperty("--y-rotation", `${xRotation}deg`);
        el.style.setProperty("--x", `${xPercent * 100}%`);
        el.style.setProperty("--y", `${yPercent * 100}%`);

        setGlowStyle({
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(at ${xPercent * 100}% ${yPercent * 100}%, rgba(255,255,255,0.3) 20%, transparent 80%)`,
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", perspective: "800px" }}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    position: "relative",
                    display: "grid",
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    gridTemplateRows: "200px 120px 40px",
                    borderRadius: "0.375rem",
                    color: "#01A977",
                    transition: "transform 0.3s ease-out",
                    transform: "rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.1)",
                }}
            >
                <img
                    src={card.images?.large}
                    alt={card.name}
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <div style={glowStyle} />
            </div>
        </div>
    );
}

function CardEffectHolo({ card }) {
    const boundingRef = useRef(null);

    const handleMouseEnter = (ev) => {
        boundingRef.current = ev.currentTarget.getBoundingClientRect();
    };

    const handleMouseLeave = (ev) => {
        boundingRef.current = null;
        ev.currentTarget.style.removeProperty("--x-rotation");
        ev.currentTarget.style.removeProperty("--y-rotation");
        ev.currentTarget.style.removeProperty("--x");
        ev.currentTarget.style.removeProperty("--y");
    };

    const handleMouseMove = (ev) => {
        if (!boundingRef.current) return;

        const { left, top, width, height } = boundingRef.current;
        const x = ev.clientX - left;
        const y = ev.clientY - top;
        const xPercent = x / width;
        const yPercent = y / height;
        const xRotation = (xPercent - 0.5) * 20;
        const yRotation = (0.5 - yPercent) * 20;

        const el = ev.currentTarget;
        el.style.setProperty("--x-rotation", `${yRotation}deg`);
        el.style.setProperty("--y-rotation", `${xRotation}deg`);
        el.style.setProperty("--x", `${xPercent * 100}%`);
        el.style.setProperty("--y", `${yPercent * 100}%`);
    };

    return (
        <div style={{ perspective: "800px" }}>
            <div
                className="card-effect-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    transform: "rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.1)",
                    transition: "transform 0.3s ease-out",
                }}
            >
                <img
                    src={card.images?.large}
                    alt={card.name}
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        position: "relative",
                        zIndex: 0,
                    }}
                />
            </div>
        </div>
    );
}

export default Card;
