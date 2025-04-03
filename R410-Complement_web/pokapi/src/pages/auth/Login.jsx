import AuthForm from "../../components/AuthForm.jsx";
import {useNavigate, Link as LinkRouter} from "react-router";
import {Heading, Callout} from "@radix-ui/themes";
import {useState} from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";

function Login() {
    const navigation = useNavigate()
    const [isError, setIsError] = useState(false)

    const fields = ["login","password"]
    
    const authCallback = async (result)=>{
        if (result) {
            navigation("/")
        }
        setIsError(true)
    }

    return (
        <>
            <Heading as="h3" mb="5">Sign in</Heading>
            {isError &&
                <Callout.Root color="red" size="1" mb="5">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Incorrect login or password
                    </Callout.Text>
                </Callout.Root>
            }
            <AuthForm fields={fields} formName="login" callback={authCallback}></AuthForm>
            <LinkRouter to="/auth/register" style={{fontSize: "14px"}}>Don't have an account ?</LinkRouter>
        </>
    )
}
export default Login;