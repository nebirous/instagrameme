import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'

function NavBar() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(userContext)
  const renderList = () => {
    if (state) {
      return [
        <li key="following">
          <Link to="/myFollowing">Following</Link>
        </li>,

        <li key="profile">
          <Link to="/profile">
            <i className="material-icons scale-transition">person</i>
          </Link>
        </li>,
        <li key="logout">
          <Link
            to="/login"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: 'CLEAR' })
              navigate('/login')
            }}
          >
            <i className="material-icons scale-transition">
              power_settings_new
            </i>
          </Link>
        </li>
      ]
    } else {
      return [
        <li key="login">
          <Link to="/login">Login</Link>
        </li>,
        <li key="register">
          <Link to="/register">Register</Link>
        </li>
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? '/myFollowing' : '/'} className="brand-logo center">
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
