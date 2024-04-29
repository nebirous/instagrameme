import React, { useState, useNavigate } from 'react'
import M from 'materialize-css'

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const createPost = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'instagrameme')
    data.append('cloud_name', 'nebirous')
    fetch('https://api.cloudinary.com/v1_1/nebirous/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error })
        } else {
          setUrl(data.url)
        }
      })
      .then(
        fetch('http://localhost:5000/createPost', {
          method: 'post',
          headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          },
          body: JSON.stringify({
            title: title,
            description: description,
            photo: url,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              M.toast({ html: data.error })
            } else {
              M.toast({
                html: 'Post created successfully!',
                classes: 'green darken-3',
              })
              navigate('/')
            }
          }),
      )
  }
  return (
    <div className="card post-card input-field">
      <h2>Upload an image!</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn waves-effect waves-light red accent-1">
          <span>File</span>
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
        onClick={() => createPost()}
      >
        post!
      </button>
    </div>
  )
}

export default CreatePost
