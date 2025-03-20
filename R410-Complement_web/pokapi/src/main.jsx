import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import './index.css'
import App from './App.jsx'
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import Auth from "./auth/Auth.jsx";
import Account from "./pages/Account.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Card from "./pages/Card.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/card/:cardId" element={<Card />} />
              </Route>
              <Route path="/auth" element={<Auth />}>
                  <Route index element={<Navigate to="/auth/login" replace />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
              </Route>
              <Route path="*" element={<h1>404 Not found</h1>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
