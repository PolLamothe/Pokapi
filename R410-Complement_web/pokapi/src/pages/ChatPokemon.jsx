import {Button, Flex, ScrollArea, TextField, Box} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {useParams} from "react-router";


function ChatPokemon() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setLoaded(true);
        })
    }, [params.cardId]);


    return (
        <>
            {loaded ? (
                <Flex align="center" direction="column" gap="5">
                    <ScrollArea className={`ChatScroll`} style={{height: 'calc(100vh - 150px)', width: '70vw'}}>
                         <Flex justify="end">
                             <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'350px', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Hello Ampharos ! My name is Le Kicks !!! How are you Today Gars</p>
                             </Box>
                         </Flex>
                        <Flex justify="start">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'350px', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>GRAAAAHAHHHHH, I'm AMPHAROOOOOOOOOOS gars !</p>
                            </Box>
                        </Flex>
                        <Flex justify="end">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'350px', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                            </Box>
                        </Flex>
                        <Flex justify="start">
                            <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:'350px', height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                <p style={{margin: '0'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            </Box>
                        </Flex>
                    </ScrollArea>
                    <TextField.Root radius="full" placeholder={`Chat with ${cardData.name}`} size="3" style={{width: "60vw"}}>
                        <TextField.Slot side="right" px="1">
                            <Button size="2">Send</Button>
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
            ) :
                ( <p> Loading... </p>)
            }

        </>


    )
}

export default ChatPokemon;