import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'
import { useParams } from 'react-router-dom'
const Profile = () => {
  const [userProfile, setProfile] = useState(null)

  const { state, dispatch } = useContext(userContext)
  const { userid } = useParams()
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log('result: ' + result)

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
                <h6>40 psoes</h6>
                <h6>50 followers</h6>
                <h6>5 following</h6>
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
