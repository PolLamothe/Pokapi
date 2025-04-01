import {TextField,Flex,Button} from "@radix-ui/themes"
import { useState } from "react";
import config from "../config"

function AuthForm({fields,destination,callback}) {
    const fieldStyle = {
        width : "90%"
    };

    const buttonStyle = {
        width : "40%",
        cursor : "pointer",
        marginTop: "70px"
    }

    const [fieldsState,setFieldsState] = useState({})

    function handleInput(e){
        setFieldsState({...fieldsState,[e.target.name]:e.target.value})
    }

    const fieldsComponent = fields.map(element => {
        return <TextField.Root name={element} placeholder={element} style={fieldStyle} size="3" value={fieldsState[element]} onChange={handleInput}></TextField.Root>
    })

    async function submitForm(){
        const response = await fetch(config.url+destination,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(fieldsState)
        })
        if(response.status == 200){
            callback(response)
        }
    }

    return (
        <>
            <Flex gap="3" direction="column" width="100%" align="center">                
                {fieldsComponent}
                <Button size="4" style={buttonStyle} onClick={submitForm}>Valider</Button>
            </Flex>
        </>
    )
}

export default AuthForm