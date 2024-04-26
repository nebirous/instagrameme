import React from 'react'

const Register = () => {
  return (
    <div className="card auth-card">
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
    </div>
  )
}

export default Register
