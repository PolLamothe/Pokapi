import {useNavigate, useParams} from "react-router";
import React, {useState, useEffect, useRef} from "react";
import {Box, Button, Flex, IconButton, Spinner, Text} from "@radix-ui/themes";
import pokapiDAO from "../dao/pokapiDAO.js";
import {Undo2} from "lucide-react";
import config from "../config.js";

function Card() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [quantity, setQuantity] = useState(0)
    let [loaded, setLoaded] = useState(false);
    let navigateToChat = useNavigate()
    let navigateBack = useNavigate()
    let navigateToSet = useNavigate()
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [wideCardPage, setWideCardPage] = useState(false)

    let marginLeftButton, marginTopButton



    useEffect(() => {
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setQuantity(data.quantity);
            setLoaded(true);
        })
    }, [params.cardId]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

        useEffect(()=>{
            if(wideCardPage){
                document.body.style.overflowY = "hidden"
                window.scrollTo("0px","0px")
            }else(
                document.body.style.overflowY = "initial"
            )
        },[wideCardPage])


    { windowSize < 1000 && windowSize > 768 ? (
        marginLeftButton = "15px",
        marginTopButton = "-15px"
    ) : windowSize < 768 ? (
        marginLeftButton = "15px",
        marginTopButton = "15px"
    ) : (
        marginLeftButton = "30px"
    )}

    let loadImageStyle = {
        width: "10vw",
        animation: "spinning .9s ease infinite",
    }


    return (
        <>
            {loaded ? (
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="center"
                    align="start"
                    gap={{ base: "6", md: "10" }}
                    px={{ base: "4", sm: "6", md: "8" }}
                    py={{ base: "4", sm: "6" }}
                    style={{ fontFamily: "Arial, sans-serif" }}
                    wrap="wrap"
                >
                    <IconButton
                        radius="full"
                        size="3"
                        style={{
                            position: "absolute",
                            left: "0",
                            marginLeft: marginLeftButton,
                            marginTop: marginTopButton,
                            backgroundColor: "rgb(100, 64, 141)",
                            border: "1px solid rgb(180, 45, 92)",
                        }}
                        onClick={() => navigateBack(-1)}
                    >
                        <Undo2 />
                    </IconButton>
                    <Box
                        p="9"
                        mt= "9"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignSelf: "start",
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        <img
                            src={cardData.set?.images?.logo || "placeholder.png"}
                            alt="Logo"
                            style={{ width: "100%", height: "auto", marginBottom: "20px",cursor : "pointer"}}
                            onClick={() => navigateToSet(`/set/${cardData.set.id}`)}
                        />
                        <Flex direction="row" align="center" gap="4">
                            <Box
                                p="2"
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "bold",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "25px",
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                    width: "75px",
                                    height: "35px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text size="3">{cardData.set?.ptcgoCode || "Unknown"}</Text>
                            </Box>
                            <Text size="3" style={{ textAlign: "left" }}>
                                {cardData.number || "Unknown"}
                                <strong>/</strong>
                                {cardData.set?.total || "Unknown"}
                            </Text>
                        </Flex>
                        <Flex direction="column" align="center" gap="2" px="4" py="2">
                            <Text size="3" style={{ textAlign: "left", width: "100%" }}>
                                <strong>Illustrator:</strong> {cardData.artist || "Unknown"}
                            </Text>
                            <Text size="3" style={{ textAlign: "left", width: "100%" }}>
                                <strong>Price:</strong> {cardData.cardmarket?.prices?.averageSellPrice || "N/A"}
                            </Text>
                            <Text size="3" style={{ textAlign: "left", width: "100%" }}>
                                you have <strong>{quantity || "N/A"}</strong> times this card
                            </Text>
                        </Flex>
                        <Flex justify="center">
                            <Button
                                variant="soft"
                                radius="full"
                                style={{ boxShadow: "0px 0px 5px 1px grey" }}
                                onClick={() => {
                                    navigateToChat(`/chatpokemon/${cardData.id}`);
                                }}
                            >
                                Chat with the Pokemon
                            </Button>
                        </Flex>
                    </Box>
                    <Flex
                        direction="column"
                        mt= "6"
                        align="center"
                        justify="center"
                        gap="4"
                        style={{ alignSelf: "start", textAlign: "center", width: "100%", maxWidth: "400px" }}
                    >
                        <div className="imgCard" onClick={()=>setWideCardPage(true)}>
                            {(cardData.rarity!==null && cardData.rarity.includes("Rare")) ? (
                                <CardEffectHolo card={cardData} />
                            ) : (
                                <CardEffect card={cardData} />
                            )}
                        </div>
                        <Box
                            p="4"
                            mt= "4"
                            mb ="8"
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                                textAlign: "center",
                                width: "75%",
                            }}
                        >
                            <Flex direction="row" align="center" gap="9">
                                <Text size="2">
                                    <strong>Number:</strong> {cardData.number || "N/A"}
                                </Text>
                                <Text size="2">{cardData.name || "Unknown Card"}</Text>
                            </Flex>
                        </Box>

                        {wideCardPage && <WideCard card={cardData} valueWideCard={setWideCardPage} />}
                    </Flex>
                </Flex>
            ) : (
                <Flex align="center" direction="column" py="9">
                    <img src={config.base+"/masterball.png"} style={loadImageStyle}/>
                </Flex>
            )}
        </>
    );    
}

function WideCard({card, valueWideCard}) {

    const styleWideCardPage = {
        width: "100vw",
        height : "100vh",
        backgroundColor : "rgba(0,0,0,0.5)",
        position : "absolute",
        top : "0px",
        left : "0px",
        zIndex : "100",
        backdropFilter: "blur(5px)"
    }


    return <div style={styleWideCardPage} onClick={()=>valueWideCard(false)}>
        <Flex justify="center" align="center" height="100%">
            {(card.rarity!==null && card.rarity.includes("Rare")) ? (
                <CardEffectHolo card={card} heightStyle="80vh" widthStyle="auto" borderRadius="40px"/>
            ) : (
                <CardEffect card={card} heightStyle="80vh" widthStyle="auto" borderRadius="40px"/>
            )}
        </Flex>
    </div>
}

function CardEffect({card, heightStyle = "412.5px", widthStyle = "300px", borderRadius = "15px"}) {
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
        <div style={{ perspective: "800px" }}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    position: "relative",
                    display: "grid",
                    width: widthStyle,
                    height: heightStyle,
                    gridTemplateRows: "200px 120px 40px",
                    borderRadius: borderRadius,
                    color: "#01A977",
                    transition: "transform 0.3s ease-out",
                    transform: "rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.1)",
                }}
            >
                <img
                    src={card.images?.large}
                    alt={card.name}
                    style={{
                        width: widthStyle,
                        height: heightStyle,
                        borderRadius: "10px",
                    }}
                />
                <div style={glowStyle} />
            </div>
        </div>
    );
}


function CardEffectHolo({ card , heightStyle, widthStyle, borderRadius = "15px"} = {}) {
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
        <div style={{ perspective: "800px" , height: heightStyle, width: widthStyle, borderRadius: borderRadius}}>
            <div
                className="card-effect-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    transform: "rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.1)",
                    transition: "transform 0.3s ease-out",
                    height: heightStyle,
                    width: widthStyle,
                    borderRadius: borderRadius
                }}
            >
                <img
                    src={card.images?.large}
                    alt={card.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        position: "relative",
                        zIndex: 0
                    }}
                />
            </div>
        </div>
    );
}


export default Card;