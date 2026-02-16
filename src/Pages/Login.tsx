import React from 'react'
import { useNavigate } from 'react-router-dom' 


export default function Login() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Login</h1> 
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg" type="submit" onClick={() => navigate("/dashboard")}>Login</button>
      </form>     
    </div>
  )
}
