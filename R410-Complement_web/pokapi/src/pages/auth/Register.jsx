import Cookies from 'js-cookie'
import AuthForm from "../../components/AuthForm.jsx";
import {useNavigate} from "react-router";

function Register() {
    const naviguation = useNavigate()

    const fields = ["login","pseudo","password"]

    const authCallback = async (response)=>{
        Cookies.set("token",response.token)
        naviguation("/")
    }

    return (
        <>
            <h3>S'inscrire</h3>
            <AuthForm fields={fields} callback={authCallback} destination="/register"></AuthForm>
        </>
    )
}

export default Register;