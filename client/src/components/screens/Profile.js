import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'

const Profile = () => {
  const [posts, setPosts] = useState(null)
  const { state, dispatch } = useContext(userContext)
  const [image, setImage] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    fetch(`/profile`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setPosts(result)
      })
  }, [])

  const updatePhoto = file => {
    setImage(file)
  }

  useEffect(() => {
    if (image) {
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
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
              pic: data.url
            })
          })
            .then(res => res.json())
            .then(result => {
              console.log(result)
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              )
              dispatch({ type: 'UPDATEPIC', payload: result.pic })
              //window.location.reload()
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [image])

  return (
    <>
      {posts ? (
        <div>
          <div className="profile-header">
            <div>
              <p>
                <img src={user.pic} alt={user.name} />
                <br />
                <div
                  className="file-field input-field"
                  style={{ margin: '10px' }}
                >
                  <div className="btn btn-submit waves-effect waves-light red accent-1">
                    <span>Update pic</span>
                    <input
                      type="file"
                      onChange={e => updatePhoto(e.target.files[0])}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </p>
            </div>
            <div>
              <h3>{user.name}</h3>
              <div className="account-stats">
                <h6>{posts.length} posts</h6>
                <h6>{user.following.length} following</h6>
                <h6>{user.followers.length} followers</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {posts.map(post => {
              return (
                <img
                  className="gallery-item"
                  src={post.photo}
                  key={post._id}
                  alt={post.title}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  )
}

export default Profile
