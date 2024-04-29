import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const PostData = () => {
    fetch('http://localhost:5000/login', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error })
        } else {
          navigate('/Profile')
        }
      })
  }

  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input type="text" placeholder="email" value="name" />
      <input type="password" placeholder="password" value="password" />
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
