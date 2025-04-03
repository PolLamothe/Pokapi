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

        <Box p="5">

            {/* COMPOSANT QUI CHARGE LA PAGE COURANTE (Home, etc) */}
            <Outlet/>

        </Box>

        <Footer></Footer>
    </>
  )
}

export default App
