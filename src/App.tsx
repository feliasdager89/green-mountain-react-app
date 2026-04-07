//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css' 
import type { ReactElement } from "react";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";



import { Navigate, Route, Routes } from "react-router-dom";
import Profile from './Pages/Profile';
import Navigation from './Components/Navigation';
import { useAuth } from './auth/AuthContext';
import ListingDetails from './Listings/ListingDetails';
import Listings from './Listings';

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return ( 
   
    <>
    <Navigation />
    <main className="pt-16">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Signin/></PublicOnlyRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 
         <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </main>
    </>
   

  )
}

export default App
