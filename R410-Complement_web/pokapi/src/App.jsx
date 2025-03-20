import {Outlet, useNavigate} from "react-router";
import {Flex, Callout, Button, Heading} from "@radix-ui/themes";
import {House, Library, StickyNote, CircleUserRound, Info, KeyRound} from "lucide-react"
import './App.css'

function App() {
    let navigate = useNavigate();

    return (
    <>
        <Callout.Root m="5">
            <Callout.Icon>
                <Info />
            </Callout.Icon>
            <Callout.Text>
                TODO : Exemple d'utilisation de composants Radix UI
            </Callout.Text>
        </Callout.Root>

        <Flex px="9" direction="column" gap="5">
            <Heading>Pokapi : header</Heading>
            <Flex gap="3">
                <Button onClick={() => navigate("/")}><House size="16"/> Home</Button>
                <Button onClick={() => navigate("/collection")}><Library size="16"/> Collection</Button>
                <Button onClick={() => navigate("/card/xy1-1")}><StickyNote size="16"/> Card xy1-1</Button>
                <Button onClick={() => navigate("/account")}><CircleUserRound size="16"/> Account</Button>
                <Button onClick={() => navigate("/auth")} variant="surface"><KeyRound size="16" /> Authentification</Button>
            </Flex>
            <Outlet/>
        </Flex>
    </>
  )
}

export default App
