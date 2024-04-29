import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Login = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const PostData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      return M.toast({ html: 'invalid email!' })
    }
    fetch('http://localhost:5000/login', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          M.toast({ html: 'Log in failed', classes: 'red darken-3' })
        } else {
          M.toast({ html: 'Log in successfull' })
          navigate('/profile')
        }
      })
  }

  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
        onClick={() => PostData()}
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
