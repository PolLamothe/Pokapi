import {Outlet, useNavigate} from "react-router";
import {Flex, Callout, Button, Heading, Box} from "@radix-ui/themes";
import {House, Library, StickyNote, CircleUserRound, Info, KeyRound} from "lucide-react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {
    let navigate = useNavigate();

    return (
    <>
        <Header></Header>

        <Box px="5" py="9">
            {/* TEMPORAIRE EXEMPLE DE NAVIGATION */}
            <Flex px="9" direction="column" gap="5">
                <Flex gap="3">
                    <Button onClick={() => navigate("/card/xy1-1")}><StickyNote size="16"/> Card xy1-1</Button>
                    <Button onClick={() => navigate("/auth")} variant="surface"><KeyRound size="16" /> Authentification</Button>
                </Flex>
            </Flex>

            {/* COMPOSANT QUI CHARGE LA PAGE COURANTE (Home, etc) */}
            <Outlet/>
        </Box>

        <Footer></Footer>
    </>
  )
}

export default App
