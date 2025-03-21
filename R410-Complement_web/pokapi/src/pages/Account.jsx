import { useEffect,useState } from "react";
import config from "../config";

function Account() {
    const [accountInfo,setAccountInfo] = useState({})

    useEffect(()=>{
        async function getAccountInfo(){
            const response = await fetch(config.url+"/getInfo",{
                method:"GET",
                credentials: "include"
            })
            console.log(await response.json())
        }
        getAccountInfo()
    },[])

    return (
        <>
            <h3>Paramètres du compte</h3>
        </>
    )
}

export default Account;