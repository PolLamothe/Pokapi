import { useEffect,useState } from "react";
import {TextField,Button,Flex} from "@radix-ui/themes"
import {Pen} from "lucide-react"
import config from "../config";
import {useNavigate} from "react-router";

function Account() {
    const naviguation = useNavigate()

    const [accountInfo,setAccountInfo] = useState({})

    useEffect(()=>{
        async function getAccountInfo(){
            const response = await fetch(config.url+"/getInfo",{
                method:"GET",
                credentials: "include"
            })
            if(response.status == 200){
                let data = await response.json()
                data["password"] = ""
                setAccountInfo(data)
            }else{
                naviguation("/")
            }
        }
        getAccountInfo()
    },[])

    function handleInput(e){
        setAccountInfo({...accountInfo,[e.target.name]:e.target.value})
    }

    async function updatePseudo(){
        const response = await fetch(config.url+"/update",{
            method:"PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountInfo)
        })
    }

    const buttonStyle = {
        cursor : "pointer",
        width : "fit-content",
        padding : "0.5vw"
    }

    const fields = Object.keys(accountInfo).map((element)=>{
        return <Flex gap='1vw'>
                    <TextField.Root value={accountInfo[element]} onChange={handleInput} name="pseudo" placeholder={element}></TextField.Root>
                    <Button style={buttonStyle} onClick={updatePseudo}>
                        <Pen/>
                        Modifier
                    </Button>
                </Flex>
    })

    return (
        <>
            <h3>Paramètres du compte</h3>
            <Flex direction="column" gap="2vw">
                {fields}
            </Flex>
        </>
    )
}

export default Account;