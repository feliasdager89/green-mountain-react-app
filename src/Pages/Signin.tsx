import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br /> 
        <label htmlFor = "email">Email:</label>
        <input type="email" id="email" name="email" />
        <br /> 
        <label htmlFor = "firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" />
        <br />
        <label htmlFor = "lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" />
        <br />  
        <label htmlFor='dateOfBirth'>Date of Birth:</label>
        <input type='date' id='dateOfBirth' name='dateOfBirth' />   
        <br />  
        <label htmlFor = "gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         type="submit"
         onClick={() => navigate("/dashboard")}
        >
            Sign In
         </button>
      </form>
    </div>
  )
}
