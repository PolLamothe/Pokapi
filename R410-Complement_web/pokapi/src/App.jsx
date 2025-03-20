import {Outlet} from "react-router";
import {Flex} from "@radix-ui/themes";
import {ArchiveIcon, FileTextIcon, HomeIcon, PersonIcon} from "@radix-ui/react-icons";
import ButtonLink from "./components/ButtonLink.jsx";
import './App.css'

function App() {
  return (
    <>
        <h2>App header</h2>
        <Flex gap="3">
            <ButtonLink to="/"><HomeIcon /> Home</ButtonLink>
            <ButtonLink to="/collection"><ArchiveIcon /> Collection</ButtonLink>
            <ButtonLink to="/card/xy1-1"><FileTextIcon /> Card xy1-1</ButtonLink>
            <ButtonLink to="/auth"><PersonIcon /> Authentification</ButtonLink>
        </Flex>
        <Outlet />
    </>
  )
}

export default App
