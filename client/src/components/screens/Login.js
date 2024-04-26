import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
      >
        login
      </button>
      <p>
        <Link to="/Register"> Create a new account</Link>
      </p>
    </div>
  )
}

export default Login
