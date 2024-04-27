import React from 'react'
import { Link } from 'react-router-dom'

const CreatePost = () => {
  return (
    <div className="card post-card input-field">
      <h2>Upload an image!</h2>
      <input type="text" placeholder="Title" />
      <input type="password" placeholder="Description" />
      <div class="file-field input-field">
        <div className="btn waves-effect waves-light red accent-1">
          <span>File</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn btn-submit waves-effect waves-light red accent-1"
        type="submit"
        name="action"
      >
        post!
      </button>
      <p>
        <Link to="/Register"> Create a new account</Link>
      </p>
    </div>
  )
}

export default CreatePost
