import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {Flex, Spinner, Card, Grid, Strong} from "@radix-ui/themes";
import {ImageCard} from "./Collection.jsx";


function SetView() {
    let params = useParams()
    const [setData, setSetData] = useState({})
    const [userCards, setUserCards] = useState({})
    const [setsCards, setSetsCards] = useState({})
    const [loaded, setLoaded] = useState(false)
    const navigateToCardPage = useNavigate();
    let cardDuSet = null
    let date = [""]


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
    }, [params.setId]);

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

    return <>
        { loaded ? (
            <Flex style={{justifyContent:"center", height: "fit-content", padding: "2vh"}}>
                <Card size="3" style={{width: "80vw", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <Flex justify="center">
                        <img src={setData.images.logo}  alt="logo" style={{maxWidth:'35vw',maxHeight:'30vh', marginBottom:'6vh'}}/>
                    </Flex>
                    <Grid columns="2" style={{gridTemplateColumns: "30% 70%"}}>
                        <Flex direction="column" style={{padding: "2vw"}}>
                            <Card style={styleElement}>
                                <p>Total number of cards in this Set : {setData.total} cards</p>
                                <p>Set release date : {date[2]}/{date[1]}/{date[0]}</p>
                                <p>Set series : {setData.series}</p>
                                <p>You own : {cardDuSet ? cardDuSet.length : 0}/{setData.total} cards</p>
                            </Card>
                        </Flex>
                        <Grid columns="repeat(auto-fit, minmax(260px, 1fr))">
                            {setsCards && cardDuSet && setsCards.length > 0 ? (
                                setsCards.map((card) => {
                                    const cardUser = cardDuSet.find((cardS) => cardS.card.id === card.id)

                                    return <div key={card.id}>
                                            { cardUser ? (
                                                <ImageCard key={card.name} card={card} navigate={() => {navigateToCardPage(`/card/${card.id}`)}} exception={true}/>
                                            ):(
                                                <div style={{opacity: "0.5"}}>
                                                    <ImageCard key={card.name} card={card} exception={true}/>
                                                </div>
                                            )}
                                    </div>


                                }
                            )) : (
                                <Flex align="center" direction="column" py="9">
                                    <Spinner size="2"/>
                                    Loading
                                </Flex>
                            )}
                        </Grid>
                    </Grid>
                </Card>
            </Flex>
        ) : (
            <Flex align="center" direction="column" py="9">
                <Spinner size="2"/>
                Loading
            </Flex>
        )}

    </>
}

export default SetView