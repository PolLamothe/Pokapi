import {Button, Flex, ScrollArea, TextField, Box, IconButton, TextArea, Slot, Spinner} from "@radix-ui/themes";
import {use, useEffect, useRef, useState} from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {useParams, useNavigate} from "react-router";
import {Undo2, ArrowUp} from "lucide-react";
import dao from "../dao/pokapiDAO.js"

function ChatPokemon() {
    let params = useParams()

    let [cardData, setCardData] = useState({})
    let [loaded, setLoaded] = useState(false)
    let navigateBack = useNavigate()
    
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [messagesList,setMessagesList] = useState([])

    const [textAreaValue,setTextAreaValue] = useState("")

    const inputRef = useRef(null)

    let scrollChatWidth, txtAreaWidth, chatBubbleWidth, chatBarWidth, fontSizeBubble, heightHeader,heightHeaderButton = null

    useEffect(()=>{
        if(localStorage.getItem("chat") == null){
            localStorage.setItem("chat", JSON.stringify({[params.cardId] : []}));
        }
        async function fetchPresentation(){
            const response = (await dao.fetchPokemonPresentation(params.cardId)).text
            let tempMessagesList = [...messagesList]
            tempMessagesList.push({sender : "pokemon",text : response})
            setMessagesList(tempMessagesList)
        }
        if(JSON.parse(localStorage.getItem("chat"))[params.cardId] == undefined || JSON.parse(localStorage.getItem("chat"))[params.cardId].length == 0){
            fetchPresentation()
        }else{
            console.log(JSON.parse(localStorage.getItem("chat"))[params.cardId])
            setMessagesList(JSON.parse(localStorage.getItem("chat"))[params.cardId])
        }
    },[])

    async function sendMessage(message){
        if(message.length == 0){
            return
        }
        setTextAreaValue("")
        inputRef.current.value = ""
        let tempMessagesList = [...messagesList]
        setMessagesList(messagesList => [...messagesList,{sender : "user",text : message}])
        const response = (await dao.fetPokemonResponse(params.cardId,message,messagesList)).text
        setMessagesList(messagesList => [...messagesList,{sender : "pokemon",text : response}])
        setTextAreaValue("")
        inputRef.current.value = ""
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

    onkeypress = (e)=>{
        if(e.key == "Enter"){
            sendMessage(textAreaValue)
            setTextAreaValue("")
            inputRef.current.value = ""
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("chat") == null){
            localStorage.setItem("chat", JSON.stringify({[params.cardId] : []}));
        }
        const conv = JSON.parse(localStorage.getItem("chat"))
        conv[params.cardId] = messagesList
        localStorage.setItem("chat",JSON.stringify(conv))
    },[messagesList])

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
        fontSizeBubble = "16px",
        heightHeader = "160px",
        heightHeaderButton = "190px"

    ) : windowSize < 600 ? (
        scrollChatWidth = "100vw",
        chatBubbleWidth = "60%",
        chatBarWidth = "80%",
        txtAreaWidth = "65vw",
        fontSizeBubble = "12px",
        heightHeader = "110px",
        heightHeaderButton = "140px"
    ) : windowSize > 1500 ? (
        scrollChatWidth = "70vw",
        chatBubbleWidth = "40vw",
        chatBarWidth = "60vw",
        txtAreaWidth = "55vw",
        fontSizeBubble = "16px",
        heightHeader = "190px",
        heightHeaderButton = "220px"
    ) : (
        scrollChatWidth = "70vw",
        chatBubbleWidth = "40vw",
        chatBarWidth = "60vw",
        txtAreaWidth = "55vw",
        fontSizeBubble = "16px",
        heightHeader = "160px",
        heightHeaderButton = "190px"
    )
    }

    return (
        <>
            {loaded ? (
                <Flex align="center" direction="column" gap="5" style={{height: `calc(100vh - ${heightHeader})`}}>
                    <IconButton radius="full" size="3" style={{zIndex: "100",position: "fixed", top: `${heightHeaderButton}`, left: "30px", backgroundColor: "rgb(100, 64, 141)", border: "1px solid rgb(180, 45, 92)"}} onClick={()=>navigateBack(-1)}>
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
                        <TextArea ref={inputRef} 
                        onChange={(e)=>{e.target.value.includes("\n") ? e.target.value = "" : setTextAreaValue(e.target.value)}} 
                        radius="full" placeholder={`Chat with ${cardData.name}`} variant="soft" size="3" style={{width: `${txtAreaWidth}`, height:"8vh",backgroundColor: "rgb(203,181,230)", border: "none", outline: "none", margin: "10px"}}>
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