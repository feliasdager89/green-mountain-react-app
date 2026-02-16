
import { Link } from 'react-router'

export default function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/register">Sign In</Link></li> 
        </ul>
      </nav>
    </div>
  )
}
