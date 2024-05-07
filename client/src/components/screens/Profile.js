import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'

const Profile = () => {
  const [posts, setPosts] = useState([])
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    fetch('/myPosts', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setPosts(result.posts)
      })
  }, [])
  return (
    <div>
      <div className="profile-header">
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/1801591?v=4"
            alt="Profile pic"
          />
        </div>
        <div>
          <h3>{state ? state.name : ''}</h3>
          <div className="account-stats">
            <h6>40 psoes</h6>
            <h6>50 followers</h6>
            <h6>5 following</h6>
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
  )
}

export default Profile
