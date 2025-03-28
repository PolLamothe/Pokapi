import {Outlet, useNavigate} from "react-router";
import {Flex, Callout, Button, Heading} from "@radix-ui/themes";
import {House, Library, StickyNote, CircleUserRound, Info, KeyRound} from "lucide-react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {
    let navigate = useNavigate();

    return (
    <>
        <Header></Header>

        <Flex px="9" direction="column" gap="5">
            {/* TEMPORAIRE EXEMPLE DE NAVIGATION */}
            <Flex gap="3">
                <Button onClick={() => navigate("/")}><House size="16"/> Home</Button>
                <Button onClick={() => navigate("/collection")}><Library size="16"/> Collection</Button>
                <Button onClick={() => navigate("/card/xy1-1")}><StickyNote size="16"/> Card xy1-1</Button>
                <Button onClick={() => navigate("/account")}><CircleUserRound size="16"/> Account</Button>
                <Button onClick={() => navigate("/auth")} variant="surface"><KeyRound size="16" /> Authentification</Button>
            </Flex>

            {/* COMPOSANT QUI CHARGE LA PAGE COURANTE (Home, etc) */}
            <Outlet/>
        </Flex>
        <Footer></Footer>
    </>
  )
}

export default App
