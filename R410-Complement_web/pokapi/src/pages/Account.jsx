import { useEffect,useState } from "react";
import {TextField,Button,Flex} from "@radix-ui/themes"
import {Pen} from "lucide-react"
import Cont from "../components/Container.jsx";
import { CircleUserRound } from 'lucide-react';
import pokapiDAO from "../dao/pokapiDAO.js";

function Account() {
    const [accountInfo,setAccountInfo] = useState({})

    useEffect(()=>{
        pokapiDAO.fetchInfo().then(data => {
            setAccountInfo(data)
        })
    },[])

    function handleInput(e){
        setAccountInfo({...accountInfo,[e.target.name]:e.target.value})
    }

    async function updatePseudo(){
        try {
            const newInfo = await pokapiDAO.fetchUpdate(accountInfo.pseudo, accountInfo.password)
            setAccountInfo(newInfo)
        } catch (e) {
            console.log("Error updating pokapiDAO : ", e)
            //TODO
        }
    }

    const buttonStyle = {
        cursor : "pointer",
        width : "fit-content",
        padding : "0.5vw"
    }

    const fields = Object.keys(accountInfo).map((element)=>{
        return <Flex gap='1vw' key={element}>
                    <TextField.Root value={accountInfo[element]} onChange={handleInput} name="pseudo" placeholder={element}></TextField.Root>
                    <Button style={buttonStyle} onClick={updatePseudo}>
                        <Pen/>
                        Modifier le profil
                    </Button>
                    <Button style={buttonStyle} onClick={updatePseudo}>
                        Se déconnecter
                    </Button>
                </Flex>
    })

    return (
        <Cont>
            <CircleUserRound size={102} color="#813d9c" strokeWidth={1.75} />
            <h3>Paramètres du compte</h3>
            <Flex direction="column" gap="2vw">
                {fields}
            </Flex>
        </Cont>
    )
}

export default Account;