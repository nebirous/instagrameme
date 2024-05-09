import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../../App'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    fetch('/allPosts', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setPosts(result.posts)
      })
  }, [])

  const likePost = id => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        //   console.log(result)
        const newData = posts.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setPosts(newData)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="home">
      {posts.map(post => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>{post.postedBy.name}</h5>
            <div className="card-image">
              <img src={post.photo} alt={post.title} />
            </div>
            <div className="card-content">
              <i className="material-icons" onClick={() => likePost(post._id)}>
                {post.likes.includes(state._id)
                  ? 'favorite'
                  : 'favorite_border'}
              </i>
              <h6>{post.likes.lenght ? post.likes.lenght : 0} likes</h6>
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
