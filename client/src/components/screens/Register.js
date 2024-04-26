import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input type="text" placeholder="name" />
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
      >
        Register
      </button>
      <p>
        <Link to="/Login"> Already have an account</Link>
      </p>
    </div>
  )
}

export default Register
