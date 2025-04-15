import {Button, Flex, ScrollArea, TextField, Box, IconButton, TextArea, Slot, Spinner} from "@radix-ui/themes";
import {useEffect, useRef, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {useParams, useNavigate} from "react-router";
import {Undo2, ArrowUp} from "lucide-react";
import dao from "../dao/pokapiDAO.js"

const sampleChat = [
    {sender : "user",text : "Hello Ampharos ! My name is Le Kicks !!! How are you Today Gars"},
    {sender : "pokemon",text : "GRAAAAHAHHHHH, I'm AMPHAROOOOOOOOOOS gars !"},
    {sender : "user",text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {sender : "pokemon",text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {sender : "user",text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {sender : "user",text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {sender : "pokemon",text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
]

function ChatPokemon() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [loaded, setLoaded] = useState(false)
    let navigateBack = useNavigate()
    
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [messagesList,setMessagesList] = useState([])

    const [textAreaValue,setTextAreaValue] = useState("")

    const inputRef = useRef(null)

    useEffect(()=>{
        async function fetchPresentation(){
            const response = (await dao.fetchPokemonPresentation(params.cardId)).text
            let tempMessagesList = [...messagesList]
            tempMessagesList.push({sender : "pokemon",text : response})
            setMessagesList(tempMessagesList)
        }
        fetchPresentation()
    },[])

    async function sendMessage(message){
        const response = (await dao.fetPokemonResponse(params.cardId,message,messagesList)).text
        let tempMessagesList = [...messagesList]
        tempMessagesList.push({sender : "user",text : message})
        tempMessagesList.push({sender : "pokemon",text : response})
        setMessagesList(tempMessagesList)
        inputRef.current.value = ""
    }

    let scrollChatWidth, txtAreaWidth, chatBubbleWidth, chatBarWidth, fontSizeBubble = null

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
        pokapiDAO.fetchCard(params.cardId).then(data => {
            setCardData(data.card);
            setLoaded(true);
        })
    }, [params.cardId]);

    { windowSize < 1000 && windowSize > 600 ? (
        scrollChatWidth = "100vw",
        chatBubbleWidth = "60%",
        chatBarWidth = "80%",
        txtAreaWidth = "65vw",
        fontSizeBubble = "16px"

    ) : windowSize < 600 ? (
        scrollChatWidth = "100vw",
        chatBubbleWidth = "60%",
        chatBarWidth = "80%",
        txtAreaWidth = "65vw",
        fontSizeBubble = "12px"
    ) : (
        scrollChatWidth = "70vw",
        chatBubbleWidth = "40vw",
        chatBarWidth = "60vw",
        txtAreaWidth = "55vw",
        fontSizeBubble = "16px"
    )
    }

    return (
        <>
            {loaded ? (
                <Flex align="center" direction="column" gap="5" style={{height: 'calc(100vh - 150px)'}}>
                    <IconButton radius="full"  size="3" style={{zIndex: "100",position: "fixed", top: "180px", left: "30px", backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)"}} onClick={()=>navigateBack(-1)}>
                        <Undo2/>
                    </IconButton>
                    <ScrollArea className={`ChatScroll`} style={{width: `${scrollChatWidth}`}}>
                        {messagesList.map((element,index)=>
                            <Flex justify={element.sender == "user" ? "end" : "start"} className={index == messagesList.length-1 ? "LastMessage" : ""} style={index == messagesList.length-1 ? {marginBottom: "20vh"} : {}}>
                                <Box style={{padding:'8px 10px 8px 10px', margin: '15px', maxWidth:`${chatBubbleWidth}`, height:'fit-content', backgroundColor:'lightgray', borderRadius: '20px'}}>
                                    <p style={{margin: '0', fontSize: `${fontSizeBubble}`}}>{element.text}</p>
                                </Box>
                            </Flex>
                        )}
                        
                    </ScrollArea>
                    <Flex width={chatBarWidth} style={{backgroundColor: "rgb(203,181,230)", opacity:'0.9', position: "fixed", bottom: "20px", borderRadius: '20px'}}>
                        <TextArea ref={inputRef} onChange={(e)=>{setTextAreaValue(e.target.value)}} radius="full" placeholder={`Chat with ${cardData.name}`} variant="soft" size="3" style={{width: `${txtAreaWidth}`, height:"8vh",backgroundColor: "rgb(203,181,230)", border: "none", outline: "none", margin: "10px"}}>
                        </TextArea>
                        <IconButton radius="full" size="3" style={{backgroundColor: "rgb(100, 64, 141)",opacity: "1", border: "1px solid rgb(180, 45, 92)", margin: "10px", position: "absolute", right: "2px", top: "2px"}}>
                            <ArrowUp onClick={(e) => {sendMessage(textAreaValue)}}/>
                        </IconButton>
                    </Flex>
                </Flex>
            ) : (
                <Flex align="center" direction="column" py="9">
                    <Spinner size="2"/>
                    Loading
                </Flex>
            )}

        </>


    )
}

export default ChatPokemon;