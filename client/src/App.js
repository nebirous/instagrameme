import "./App.css";
import NavBar from "./components/NavBar";
//import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Register from "./components/screens/Register";
import Login from "./components/screens/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
