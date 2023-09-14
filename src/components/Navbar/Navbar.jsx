import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { boolean } from "yup";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const Navigate = useNavigate();
  const handleLogout = async () => {
    window.localStorage.clear();
    Navigate("/");
  };
  return (
    <nav className='navbar'>
      <div>
        <h1>Wave-Upload</h1>
      </div>

      <div className='link'>
        <ul className={`${toggle ? "active" : ""}`}>
          <li>
            <button>Home</button>
          </li>
          <li onClick={() => Navigate("/waveUpload/upload")}>
            <Link to='/waveUpload/upload'>
              <button>Upload</button>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <button className='logout'>Logout</button>
          </li>
        </ul>
      </div>
      <div
        className={`toggle ${toggle ? "active" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
