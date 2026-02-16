//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css' 
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";

import { Route, Routes } from "react-router-dom";
import Profile from './Pages/Profile';

function App() {
 // const [count, setCount] = useState(0)

  return ( 
   
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </>
   

  )
}

export default App
