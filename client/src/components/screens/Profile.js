import React from 'react'

const Profile = () => {
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
          <h3>Nebirous Szandor</h3>
          <div className="account-stats">
            <h6>40 psoes</h6>
            <h6>50 followers</h6>
            <h6>5 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
        <img
          className="gallery-item"
          src="https://avatars.githubusercontent.com/u/1801591?v=4"
          alt="Profile pic"
        />
      </div>
    </div>
  )
}

export default Profile
