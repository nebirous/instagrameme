import React, { useState, useEffect } from 'react'

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('/allPosts', {
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
    <div className="home">
      {posts.map(post => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>{post.postedBy.name}</h5>
            <div className="card-image">
              <img src={post.photo} alt="takefusa papadelta" />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite</i>
              <h6>{post.title}</h6>
              <p>{post.description}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
