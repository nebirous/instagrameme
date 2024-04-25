import React from "react";

function NavBar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo center">
          Instagrameme
        </a>
        <ul id="nav-mobile" className="right">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
