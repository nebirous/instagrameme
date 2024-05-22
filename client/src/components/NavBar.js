import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import M from 'materialize-css'

function NavBar() {
  const searchModal = useRef(null)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const renderList = () => {
    if (state) {
      return [
        <li key="search">
          <i
            data-target="search-modal"
            className="material-icons scale-transition modal-trigger"
          >
            search
          </i>
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

  const fetchUsers = query => {
    setSearch(query)
    fetch('/search-users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(results => {
        setUserDetails(results)
      })
  }

  return (
    <nav>
      <div>
        <div className="nav-wrapper">
          <Link to={state ? '/' : '/login'} className="brand-logo center">
            Instagrameme
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        <div
          id="search-modal"
          class="modal"
          ref={searchModal}
          style={{ color: 'black' }}
        >
          <div className="modal-content">
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={e => fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map(item => {
                return (
                  <Link
                    to={
                      item._id !== state._id
                        ? '/profile/' + item._id
                        : '/profile'
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close()
                      setSearch('')
                    }}
                  >
                    <li className="collection-item">{item.name}</li>
                  </Link>
                )
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => setSearch('')}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
