import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("*Required"),
  password: yup.string().required("*Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

function Login({ url }) {
  const Navigate = useNavigate();
  const [invalid, setInvaild] = useState(false);
  const [activationPending, setActivationpending] = useState(false);

  const handleLogin = async (values, onSubmitProps) => {
    try {
      const res = await axios.post(`${url}/user/signin`, {
        email: values.email,
        password: values.password,
      });
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(res.data.token)
      );
      onSubmitProps.resetForm();
      setInvaild(false);
      setActivationpending(false);
      Navigate("/waveUpload");
    } catch (error) {
      if (error.response.status == 400 || error.response.status == 500) {
        setInvaild(true);
        onSubmitProps.resetForm();
        setTimeout(() => {
          setInvaild(false);
        }, 3000);
      } else {
        setActivationpending(true);
        onSubmitProps.resetForm();
        setTimeout(() => {
          setActivationpending(false);
        }, 4000);
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleLogin(values, onSubmitProps);
  };
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='formContainer'>
              <div className='imgcontainer'>
                <h1>LogIn</h1>
              </div>

              <div className='container'>
                <label htmlFor='email'>
                  <b>Email</b>
                </label>
                <input
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                <p className='error'>{touched.email ? errors.email : null}</p>
                <label htmlFor='password'>
                  <b>Password</b>
                </label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  required
                />
                <p className='error'>
                  {touched.password ? errors.password : null}
                </p>
                <p className='validdata'>
                  {invalid ? "Invalid Credentials" : null}
                </p>
                <p className='validdata'>
                  {activationPending
                    ? "Account not activated, Kindly check mail"
                    : null}
                </p>

                <button
                  type='submit'
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <div className='bottom'>
                  <Link to='/register'>
                    <p>Register</p>
                  </Link>
                  <Link to='/forgotPassword'>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Login;
