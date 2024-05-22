import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    if (url) {
      uploadFields()
    }
  }, [url])
  const PostData = () => {
    if (image) {
      uploadPic()
    } else {
      uploadFields()
    }
  }
  const uploadFields = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: 'invalid email!' })
    }
    fetch('http://localhost:5000/register', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        pic: url
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error })
        } else {
          navigate('/login')
        }
      })
  }
  const uploadPic = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'instagrameme')
    data.append('cloud_name', 'nebirous')
    fetch('https://api.cloudinary.com/v1_1/nebirous/image/upload', {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="card auth-card input-field">
      <h2>Instagrameme</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
      <div className="file-field input-field">
        <div className="btn waves-effect waves-light red accent-1">
          <span>Profile pic</span>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
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
