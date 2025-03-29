import Cookies from 'js-cookie'
import AuthForm from "../../components/AuthForm.jsx";
import {useNavigate} from "react-router";

function Register() {
    const navigation = useNavigate()

    const fields = ["login","pseudo","password"]

    const authCallback = async (response)=>{
        let token = (await response.json())["token"]
        localStorage.setItem("token",token)
        navigation("/")
    }

    return (
        <>
            <h3>S'inscrire</h3>
            <AuthForm fields={fields} callback={authCallback} destination="/register"></AuthForm>
        </>
    )
}

export default Register;