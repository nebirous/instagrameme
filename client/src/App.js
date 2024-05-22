import React, { useEffect, createContext, useReducer, useContext } from 'react'
import './App.css'
import NavBar from './components/NavBar'
//import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Register from './components/screens/Register'
import Login from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'
import { initialState, reducer } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import MyFollowing from './components/screens/Following'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/NewPassword'

export const userContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      if (location.pathname !== '/reset') return navigate('/login')
    }

    dispatch({ type: 'USER', payload: user })
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/user/:userid" element={<UserProfile />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/myFollowing" element={<MyFollowing />}></Route>
      <Route path="/create" element={<CreatePost />}></Route>
      <Route exact path="/reset" element={<Reset />}></Route>
      <Route exact path="/reset/:token" element={<NewPassword />}></Route>
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const renderUploadButton = () => {
    if (state) {
      return [
        <Link
          to="/create"
          className="btn-floating btn-large waves-effect waves-light red accent-1"
        >
          <i className="material-icons">camera_alt</i>
        </Link>
      ]
    }
  }
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <div className="main-container">
          <Routing />
        </div>
        {renderUploadButton()}
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
