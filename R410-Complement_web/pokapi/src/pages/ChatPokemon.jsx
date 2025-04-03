import {Button, Flex, ScrollArea, TextField, Box, IconButton, TextArea, Slot} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {useParams, useNavigate} from "react-router";
import {Undo2, ArrowUp} from "lucide-react";


function ChatPokemon() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [loaded, setLoaded] = useState(false)
    let navigateBack = useNavigate()

    useEffect(() => {
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setLoaded(true);
        })
    }, [params.cardId]);


    return (
        <>
            {loaded ? (
                <Flex align="center" direction="column" gap="5" style={{height: 'calc(100vh - 150px)'}}>
                    <IconButton radius="full"  size="3" style={{position: "fixed", top: "180px", left: "30px", backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)"}} onClick={()=>navigateBack(-1)}>
                        <Undo2/>
                    </IconButton>
                    <ScrollArea className={`ChatScroll`} style={{width: '70vw'}}>
                         <Flex justify="end">
                             <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Hello Ampharos ! My name is Le Kicks !!! How are you Today Gars</p>
                             </Box>
                         </Flex>
                        <Flex justify="start">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>GRAAAAHAHHHHH, I'm AMPHAROOOOOOOOOOS gars !</p>
                            </Box>
                        </Flex>
                        <Flex justify="end">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                            </Box>
                        </Flex>
                        <Flex justify="start">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                            </Box>
                        </Flex>
                        <Flex justify="end">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                            </Box>
                        </Flex>
                        <Flex justify="start" className="LastMessage" style={{marginBottom: "20vh"}}>
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'40vw', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            </Box>
                        </Flex>
                    </ScrollArea>
                    <Flex width="60vw" style={{backgroundColor: "rgb(184,161,213)", position: "fixed", bottom: "20px", borderRadius: '20px'}}>
                        <TextArea radius="full" placeholder={`Chat with ${cardData.name}`} variant="soft" size="3" style={{width: "55vw", height:"8vh",backgroundColor: "rgb(184,161,213)", border: "none", outline: "none", margin: "10px"}}>
                        </TextArea>
                        <IconButton radius="full" size="3" style={{backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)", margin: "10px", position: "absolute", right: "2px", top: "2px"}}>
                            <ArrowUp />
                        </IconButton>
                    </Flex>
                </Flex>
            ) :
                ( <p> Loading... </p>)
            }

        </>


    )
}

export default ChatPokemon;