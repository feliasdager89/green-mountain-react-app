
import { useNavigate } from 'react-router'; 
import Hero from './Hero.js';

export default function Landing() { 
      const navigate = useNavigate();
  return (
    <div>
       <h1>Welcome to Green Mountain!</h1>
       <Hero/>
       <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg" onClick={() => navigate("/login")}>Login</button>
       <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg" onClick={() => navigate("/register")}>Register</button>
    </div>
  )
}
