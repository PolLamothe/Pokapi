import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import './index.css'
import App from './App.jsx'
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Account from "./pages/Account.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Card from "./pages/Card.jsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import ChatPokemon from "./pages/ChatPokemon.jsx";
import Sets from "./pages/Sets.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Theme accentColor="violet" grayColor="mauve">
          <BrowserRouter>
              <Routes>
                  <Route element={<ProtectedRoute />} >
                      <Route path="/" element={<App />}>
                          <Route index element={<Home />} />
                          <Route path="/account" element={<Account />} />
                          <Route path="/collection" element={<Collection />} />
                          <Route path="/card/:cardId" element={<Card />} />
                          <Route path="/chatpokemon/:cardId" element={<ChatPokemon />} />
                          <Route path="/sets" element={<Sets/>}></Route>
                      </Route>
                  </Route>
                  <Route path="/auth" element={<Auth />}>
                      <Route index element={<Navigate to="/auth/login" replace />} />
                      <Route path="register" element={<Register />} />
                      <Route path="login" element={<Login />} />
                  </Route>
                  <Route path="*" element={<h1>404 Not found</h1>}/>
              </Routes>
          </BrowserRouter>
      </Theme>
  </StrictMode>,
)
