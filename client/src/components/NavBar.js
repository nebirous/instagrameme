import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo center">
          Instagrameme
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
