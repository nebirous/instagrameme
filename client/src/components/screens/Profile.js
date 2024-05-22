import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [posts, setPosts] = useState(null)
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

  return (
    <>
      {posts ? (
        <div>
          <div className="profile-header">
            <div>
              <img src={user.pic} alt={user.name} />
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
