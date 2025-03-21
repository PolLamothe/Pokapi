import {TextField,Flex,Button} from "@radix-ui/themes"
import { useState } from "react";
import {useNavigate} from "react-router";
import config from "../config"
import Cookies from 'js-cookie'

function Register() {

    const naviguation = useNavigate()

    const fieldStyle = {
        width : "30%"
    };

    const buttonStyle = {
        width : "20%",
        cursor : "pointer"
    }

    const fields = ["login","pseudo","password"]
    const [fieldsState,setFieldsState] = useState({
        "login" : "",
        "pseudo" : "",
        "password" : ""
    })

    function handleInput(e){
        setFieldsState({...fieldsState,[e.target.name]:e.target.value})
    }

    const fieldsComponent = fields.map(element => {
        return <TextField.Root name={element} placeholder={element} style={fieldStyle} size="3" value={fieldsState[element]} onChange={handleInput}></TextField.Root>
    })

    async function submitForm(){
        const response = await fetch(config.url+"/register",{
            method:"POST",
            body:JSON.stringify(fieldsState)
        })
        if(response.status == 200){
            Cookies.set("token",(await response.json()).token)
            naviguation("/")
        }
    }

    return (
        <>
            <h3>S'inscrire</h3>
            <Flex gap="3" direction="column" width="100%" align="center">                
                {fieldsComponent}
                <Button size="4" style={buttonStyle} onClick={submitForm}>Valider</Button>
            </Flex>
        </>
    )
}

export default Register;