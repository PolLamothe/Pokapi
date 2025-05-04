import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {Flex, Spinner, Card, Grid, Strong, Button, IconButton} from "@radix-ui/themes";
import {ImageCard} from "./Collection.jsx";
import BoosterOpening from "../components/BoosterOpening.jsx";
import {Undo2} from "lucide-react";


function SetView() {
    let params = useParams()
    
    const [setData, setSetData] = useState({})
    
    const [userCards, setUserCards] = useState({})
    
    const [setsCards, setSetsCards] = useState({})
    
    const [loaded, setLoaded] = useState(false)

    const [openBoosterState,setOpenBoosterState] = useState(false)

    const [searched,setSearched] = useState(null)
    
    const navigateToCardPage = useNavigate();

    let navigateBack = useNavigate()

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    let gridtemplate, gridTemplateColumn,widthCard, sizeCard

    let cardDuSet = null
    let date = [""]


    function retrieveSearched(){
        pokapiDAO.fetchSearched().then(searched => {
            setSearched(searched)
        })
        console.log(searched)
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        pokapiDAO.fetchSet(params.setId).then(data => {
            setSetData(data)
            setLoaded(true)
        })
        pokapiDAO.fetchMyCards().then(data => {
            setUserCards(data)
        })
        pokapiDAO.fetchSetsCards(params.setId).then(data => {
            setSetsCards(data)
        })

        retrieveSearched()
    }, [params.setId,openBoosterState]);

    if (loaded) {
        date = setData.releaseDate.split("/")
    }

    if (userCards && userCards.length > 0) {
        cardDuSet = userCards.filter(card => (
            card.card.set.id === params.setId
        ))
    }


    let styleElement = {
        backgroundColor: "rgb(81,35,135)",
        border: "1px solid rgb(180, 45, 92)",
        fontFamily:"'Racing Sans One', sans-serif",
        fontSize:"16px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    const openButtonStyle = {
        background: "#64408D",
        fontSize : "35px",
        padding : "3vh",
        cursor : "pointer",
        height : "fit-content",
        borderRadius : "40px",
        border: "2px solid #B42D5C",
        fontFamily: "'Racing Sans One', sans-serif",
        marginBottom : "2vh",
        marginTop : "5vh",
    }

    useEffect(()=>{
        if(openBoosterState){
            document.body.style.overflowY = "hidden"
            window.scrollTo("0px","0px")
        }else(
            document.body.style.overflowY = "initial"
        )
    },[openBoosterState])

    { windowSize < 1100 && windowSize > 600 ? (
        gridtemplate = "100%",
        gridTemplateColumn = "repeat(auto-fit, minmax(260px, 1fr))",
        widthCard = "90vw",
        sizeCard = "2"
    ) : windowSize < 600 ? (
        gridtemplate = '100%',
        gridTemplateColumn = "repeat(auto-fit, minmax(150px, 1fr))",
        widthCard = "100vw",
        sizeCard = "1"
    ) : (
        gridtemplate = '30% 70%',
        gridTemplateColumn = "repeat(auto-fit, minmax(260px, 1fr))",
        widthCard = "80vw",
        sizeCard = "3"
    )}

    let loadImageStyle = {
        width: "10vw",
        animation: "spinning .9s ease infinite",
    }

    return <>
        { loaded ? (
            <Flex style={{justifyContent:"center", height: "fit-content", padding: "2vh"}}>
                <Card size={sizeCard} style={{width: `${widthCard}`, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <Flex justify="center">
                        <IconButton radius="full" size="3" style={{zIndex: "100",position: "fixed", top: `30px`, left: "30px", backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)"}} onClick={()=>navigateBack(-1)}>
                            <Undo2/>
                        </IconButton>
                        <img src={setData.images.logo}  alt="logo" style={{maxWidth:'35vw',maxHeight:'30vh', marginBottom:'6vh'}}/>
                    </Flex>
                    <Grid columns="2" style={{gridTemplateColumns: `${gridtemplate}`}}>
                        <Flex direction="column" style={{padding: "2vw"}}>
                            <Card style={styleElement}>
                                <p>Total number of cards in this Set : {setData.total} cards</p>
                                <p>Set release date : {date[2]}/{date[1]}/{date[0]}</p>
                                <p>Set series : {setData.series}</p>
                                <p>You own : {cardDuSet ? cardDuSet.length : 0}/{setData.total} cards</p>
                            </Card>
                            <Button style={openButtonStyle} onClick={()=>{setOpenBoosterState(true)}}>Open Booster</Button>
                        </Flex>
                        <Grid columns={gridTemplateColumn} justify="center">
                            {setsCards && cardDuSet && setsCards.length > 0 ? (
                                setsCards.map((card) => {
                                    const cardUser = cardDuSet.find((cardS) => cardS.card.id === card.id)
                                    return <div key={card.id} style={{maxWidth: "100%"}}>
                                        <ImageCard 
                                        key={card.name} 
                                        card={card} 
                                        exception={true} 
                                        posssesed={cardUser}
                                        searched={searched.includes(card.id)}
                                        onSearchedAdd={retrieveSearched}/>
                                    </div>
                                }
                            )) : (
                                <Flex align="center" direction="column" py="9">
                                    <img src="./masterball.png" style={loadImageStyle}/>
                                </Flex>
                            )}
                        </Grid>
                    </Grid>
                </Card>
            </Flex>
        ) : (
            <Flex align="center" direction="column" py="9">
                <img src="./masterball.png" style={loadImageStyle}/>
            </Flex>
        )}
        {openBoosterState && (
            <BoosterOpening setId={params.setId} callback={()=>{setOpenBoosterState(false)}}/>
        )}
    </>
}

export default SetView