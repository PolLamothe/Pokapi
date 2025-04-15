import { TextField,Button } from "@radix-ui/themes"
import {MagnifyingGlassIcon, ReloadIcon} from "@radix-ui/react-icons"
import { useState,useEffect,useRef } from "react"
import dao from "../dao/pokapiDAO.js"

function Sets(){

    const initialLimitSize = 15

    const [listSets,setListSets] = useState(null)

    const [limitSize,setLimitSize] = useState(initialLimitSize)

    const [searchBarValue,setSearchBarValue] = useState("")

    const searchBar = useRef(null)


    useEffect(()=>{
        async function fetchSets(){
            setListSets((await dao.fetchSets()).data)
        }
        fetchSets()
    },[])

    const textFieldStyle = {
        width : "30vw",
        marginLeft : "50vw",
        transform : "translateX(-50%)",
        marginTop : "5vh",
        marginBottom : "5vh",
        borderRadius : "20px",
        justifyContent: "center"
    }

    const setItemStyle = {
        width : "12vw",
        height : "10vh",
        objectFit : "contain",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding : "1vw",
        borderRadius : "20px",
        cursor : "pointer",
    }

    const setsContainerStyle = {
        display : "flex",
        flexDirection : "row",
        flexWrap : "wrap",
        gap : "5vw",
        justifyContent : "center",
        marginBottom : "5vh",
    }

    return (
        <>
            <TextField.Root placeholder="Rechercher un set" style={textFieldStyle} size="3" ref={searchBar} onChange={(e)=>{setSearchBarValue(e.target.value)}}>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <div id="setsContainer" style={setsContainerStyle}>
                {listSets && listSets.map((element,index)=>{
                    if(index > limitSize-1){
                        return null
                    }
                    if(!element.name.toLowerCase().includes(searchBarValue.toLowerCase())){
                        return null
                    }
                    return <img src={element.images.logo} style={setItemStyle}/>
                })}
            </div>
            <Button style={{marginLeft : "50vw",transform : "translateX(-50%)",marginBottom : "5vh",cursor : "pointer"}} onClick={()=>{setLimitSize(limitSize+initialLimitSize)}}>
                <ReloadIcon /> Charger plus
            </Button>
        </>
    )
}

export default Sets