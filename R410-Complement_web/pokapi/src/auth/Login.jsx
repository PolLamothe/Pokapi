import Cookies from 'js-cookie'
import AuthForm from "../components/AuthForm";
import {useNavigate} from "react-router";

function Login() {
    const naviguation = useNavigate()

    const fields = ["login","password"]
    
    const authCallback = async (response)=>{
        Cookies.set("token",response.token)
        naviguation("/")
    }

    return (
        <>
            <h3>Se connecter</h3>
            <AuthForm fields={fields} destination="/login" callback={authCallback}></AuthForm>
        </>
    )
}

export default Login;