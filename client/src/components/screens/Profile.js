import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [userProfile, setProfile] = useState(null)
  useEffect(() => {
    fetch(`/profile`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result)
      })
  }, [])

  return (
    <>
      {userProfile ? (
        <div>
          <div className="profile-header">
            <div>
              <img src={userProfile.user.pic} alt={userProfile.user.name} />
            </div>
            <div>
              <h3>{userProfile ? userProfile.user.name : ''}</h3>
              <div className="account-stats">
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.following.length} following</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map(post => {
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
