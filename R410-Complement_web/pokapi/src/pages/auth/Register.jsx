import AuthForm from "../../components/AuthForm.jsx";
import {Link as LinkRouter, useNavigate} from "react-router";
import {Heading} from "@radix-ui/themes";

function Register() {
    const navigation = useNavigate()

    const fields = ["login","pseudo","password"]

    const authCallback = async (result)=>{
        if (result) {
            navigation("/")
        }
    }

    return (
        <>
            <Heading as="h3" mb="5">Sign up</Heading>
            <AuthForm fields={fields} callback={authCallback} formName="register"></AuthForm>
            <LinkRouter to="/auth/login" style={{fontSize: "14px"}}>Already have an account ?</LinkRouter>
        </>
    )
}

export default Register;