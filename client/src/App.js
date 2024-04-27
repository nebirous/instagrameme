import './App.css'
import NavBar from './components/NavBar'
//import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Register from './components/screens/Register'
import Login from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
        </Routes>
      </div>
      <Link
        to="/create"
        class="btn-floating btn-large waves-effect waves-light red accent-1"
      >
        <i class="material-icons">camera_alt</i>
      </Link>
    </BrowserRouter>
  )
}

export default App
