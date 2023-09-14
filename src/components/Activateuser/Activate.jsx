import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Activate({ url }) {
  const [valid, setValid] = useState(false);
  const [activate, setActivate] = useState(false);
  const Navigate = useNavigate();
  const { id } = useParams();

  const handleActivate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${url}/user/activate/${id}`);
      setValid(false);
      setActivate(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } catch (error) {
      setActivate(false);
      setValid(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={(e) => handleActivate(e)}>
        <div className='formContainer'>
          <div className='imgcontainer'>
            <h1>Activate Account</h1>
          </div>
          <div className='container'>
            <p className='validdata'>{valid ? "Link expired" : null}</p>
            <p className='validdata1'>
              {activate ? "Account Activated" : null}
            </p>
            <button
              type='submit'
              onClick={(e) => handleActivate(e)}
            >
              Click me
            </button>
            <div className='bottom'>
              <Link to='/'>
                <p>Login</p>
              </Link>
              <Link to='/register'>
                <p>Register</p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Activate;
