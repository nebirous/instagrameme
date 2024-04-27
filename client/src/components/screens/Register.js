import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const PostData = () => {
    fetch('http://localhost:5000/register', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error })
        }
      })
  }
  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
        onClick={() => PostData()}
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
