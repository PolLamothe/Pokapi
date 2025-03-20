import { useState } from 'react'
import '../App.css'
import {Outlet} from "react-router";

function App() {
  return (
    <>
        <header><h2>App header</h2></header>
        <Outlet />
    </>
  )
}

export default App
