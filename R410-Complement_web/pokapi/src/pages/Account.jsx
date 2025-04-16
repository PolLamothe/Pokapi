import { useEffect,useState } from "react";
import {TextField,Button,Flex, Dialog, Text} from "@radix-ui/themes"
import {Pen} from "lucide-react"
import Cont from "../components/Container.jsx";
import { CircleUserRound } from 'lucide-react';
import pokapiDAO from "../dao/pokapiDAO.js";
import {useNavigate} from "react-router";

function Account() {
    const [accountInfo,setAccountInfo] = useState({})
    const navigate = useNavigate()
    const [newPseudo, setNewPseudo] = useState("")
    const [newPassword, setNewPassword] = useState(null)

    useEffect(()=>{
        pokapiDAO.fetchInfo().then(data => {
            setAccountInfo(data)
            setNewPseudo(data.pseudo)
        })
    },[])

    async function updateInfos(){
        try {
            const newInfo = await pokapiDAO.fetchUpdate(newPseudo, newPassword)
            setAccountInfo(newInfo)
            setNewPseudo(newInfo.pseudo)
        } catch (e) {
            console.log("Error updating pokapiDAO : ", e)
        }
    }

    return (
        <Cont height="60vh">
            <CircleUserRound size={102} color="#813d9c" strokeWidth={1.75} />
            <h3>Votre compte</h3>
            <Flex direction="column" gap="2" mb="4">
                <Flex gap="2"><Text weight="bold">Login: </Text><Text>{accountInfo.login}</Text></Flex>
                <Flex gap="2"><Text weight="bold">Pseudo: </Text><Text>{accountInfo.pseudo}</Text></Flex>
            </Flex>
            {/*DIALOG*/}
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button style={{width: "40%"}} mb="3">Edit profile</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to your profile.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Pseudo
                            </Text>
                            <TextField.Root
                                placeholder="Enter your new pseudo"
                                value={newPseudo}
                                onChange={(p) => setNewPseudo(p.target.value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Password
                            </Text>
                            <TextField.Root
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword==null ? "" : newPassword}
                                onChange={(p) => setNewPassword(p.target.value)}
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={async () => await updateInfos()}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
            <Button variant="outline" style={{width: "40%"}} onClick={() => {
                localStorage.removeItem("token")
                navigate("/")
            }}>Log out</Button>
        </Cont>
    )
}

export default Account;