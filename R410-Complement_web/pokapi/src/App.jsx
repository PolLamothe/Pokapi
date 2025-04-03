import {Outlet, useLocation} from "react-router";
import {Box} from "@radix-ui/themes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {
    let location = useLocation();


    return (
    <>
        <Header></Header>
        <Box p="5">
            {/* COMPOSANT QUI CHARGE LA PAGE COURANTE (Home, etc) */}
            <Outlet/>
        </Box>
        { !location.pathname.startsWith("/chatpokemon/") && <Footer></Footer>}
    </>
  )
}

export default App
