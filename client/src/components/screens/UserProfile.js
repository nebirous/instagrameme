import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'
import { useParams } from 'react-router-dom'
const Profile = () => {
  const [userProfile, setProfile] = useState(null)
  const { state, dispatch } = useContext(userContext)
  const { userid } = useParams()
  const [showfollow, setShowFollow] = useState(
    state.following ? !state.following.includes(userid) : true
  )
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result)
      })
  }, [])

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({ followId: userid })
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: 'UPDATE',
          payload: {
            following: DataTransfer.following,
            followers: DataTransfer.followers
          }
        })
        localStorage.setItem('user', JSON.stringify(result))
        setProfile(prevState => {
          if (userProfile.user.followers.includes(result._id)) {
            const newFollowers = prevState.user.followers.filter(
              item => item !== result._id
            )

            setShowFollow(true)
            return {
              ...prevState,
              user: { ...prevState.user, followers: newFollowers }
            }
          }

          setShowFollow(false)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id]
            }
          }
        })
      })
  }

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
              {showfollow ? (
                <button
                  className="btn btn-submit waves-effect waves-light red accent-1"
                  type="submit"
                  name="action"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn btn-submit waves-effect waves-light red accent-1"
                  type="submit"
                  name="action"
                  onClick={() => followUser()}
                >
                  Unfollow
                </button>
              )}
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
