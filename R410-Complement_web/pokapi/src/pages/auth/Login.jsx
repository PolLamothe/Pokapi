import Cookies from 'js-cookie'
import AuthForm from "../../components/AuthForm.jsx";
import {useNavigate} from "react-router";

function Login() {
    const navigation = useNavigate()

    const fields = ["login","password"]
    
    const authCallback = async (response)=>{
        let token = (await response.json())["token"]
        localStorage.setItem("token",token)
        navigation("/")
    }

    return (
        <>
            <h3>Se connecter</h3>
            <AuthForm fields={fields} destination="/login" callback={authCallback}></AuthForm>
        </>
    )
}

export default Login;