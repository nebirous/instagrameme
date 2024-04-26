import React from 'react'

const Login = () => {
  return (
    <div className="card auth-card">
      <h2>Instagrameme</h2>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
      >
        login
      </button>
    </div>
  )
}

export default Login
