import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../../App'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [commentField, setCommentField] = useState('')
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

  const createComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        text,
        postId
      })
    })
      .then(res => res.json())
      .then(result => {
        const newData = posts.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setPosts(newData)
        setCommentField('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deletePost = postid => {
    fetch(`/deletepost/${postid}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        const newPost = posts.filter(item => {
          return item._id !== result._id
        })
        setPosts(newPost)
      })
  }

  return (
    <div className="home">
      {posts.map(post => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>
              {post.postedBy.name}
              {post.postedBy.id === state._id && (
                <i
                  className="material-icons"
                  style={{
                    float: 'right'
                  }}
                  onClick={() => deletePost(post._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              {
                //TODO: Animate double click to like
              }
              <img
                src={post.photo}
                alt={post.title}
                onDoubleClick={() => likePost(post._id)}
              />
            </div>

            <div className="card-content">
              <i
                className="material-icons scale-transition"
                onClick={() => likePost(post._id)}
              >
                {
                  //TODO: Animate Like Button
                }
                {post.likes.includes(state.id) ? 'favorite' : 'favorite_border'}
              </i>
              <h6>{post.likes.length ? post.likes.length : 0} likes</h6>
              <h6>{post.title}</h6>
              <p>{post.description}</p>

              {post.comments.map(record => {
                console.log(record)
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: '500' }}>
                      {record.postedBy.name}
                    </span>{' '}
                    {record.text}
                  </h6>
                )
              })}
              <form
                onSubmit={e => {
                  e.preventDefault()
                  createComment(e.target[0].value, post._id)
                }}
              >
                <input
                  value={commentField}
                  onChange={e => setCommentField(e.target.value)}
                  type="text"
                  placeholder="add a comment"
                />
              </form>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
