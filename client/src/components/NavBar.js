import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'

function NavBar() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(userContext)
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link
            to="/login"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: 'CLEAR' })
              navigate('/login')
            }}
          >
            Log out
          </Link>
        </li>,
      ]
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/register">Register</Link>
        </li>,
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? '/' : '/login'} className="brand-logo center">
          Instagrameme
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
