import {TextField, Flex, Button, Callout} from "@radix-ui/themes"
import { useState } from "react";
import pokapiDAO from "../dao/pokapiDAO.js";
import {InfoCircledIcon} from "@radix-ui/react-icons";

function AuthForm({fields,formName,callback}) {

    let objectState = []
    fields.forEach(field => {
        objectState.push([field, ''])
    })

    const [fieldsState,setFieldsState] = useState(Object.fromEntries(objectState))
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    function handleInput(e){
        setFieldsState({
            ...fieldsState,
            [e.target.name]: e.target.value
        })
    }

    async function submitForm(){
        try {
            let result
            if (formName === "register") {
                setLoading(true)
                result = await pokapiDAO.fetchRegister(fieldsState.login, fieldsState.pseudo, fieldsState.password)
                setLoading(false)
            } else if (formName === "login") {
                setLoading(true)
                result = await pokapiDAO.fetchLogin(fieldsState.login, fieldsState.password)
                setLoading(false)
            }
            callback(result)
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

    return (
        <>
            <Flex gap="3" direction="column" width="100%" align="center" mb="5">
                {error &&
                    <Callout.Root color="red" size="1" mb="5">
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            {error}
                        </Callout.Text>
                    </Callout.Root>
                }
                {fields.map(element => (
                    <TextField.Root
                        key={element}
                        name={element}
                        placeholder={element}
                        size="3"
                        style={fieldStyle}
                        value={fieldsState[element]}
                        onChange={handleInput}
                        type={element==="password" ? "password" : "text"}>
                    </TextField.Root>
                ))}
                <Button size="3" onClick={submitForm} mt="4" style={buttonStyle} loading={loading}>Submit</Button>
            </Flex>
        </>
    )
}

const fieldStyle = {
    width : "100%"
};

const buttonStyle = {
    cursor : "pointer",
}

export default AuthForm