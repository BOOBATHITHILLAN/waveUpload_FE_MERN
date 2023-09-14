import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("*Required"),
});

const initialValuesLogin = {
  email: "",
};

function ForgotPassword({ url }) {
  const [valid, setValid] = useState(false);
  const [mailcheck, setMailcheck] = useState(false);
  const Navigate = useNavigate();

  const handleForgotEmail = async (values, onSubmitProps) => {
    try {
      const res = await axios.patch(`${url}/user/forgotPassword`, {
        email: values.email,
      });
      onSubmitProps.resetForm();
      setValid(false);
      setMailcheck(true);
      setTimeout(() => {
        Navigate("/");
      }, 3000);
    } catch (error) {
      setMailcheck(false);
      setValid(true);
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleForgotEmail(values, onSubmitProps);
  };
  return (
    <>
      {" "}
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
                <h1>Forgot Password</h1>
                <p>Please fill in this form to send password reset mail.</p>
              </div>
              <div className='container'>
                <label htmlFor='email'>
                  <b>Registered Email</b>
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
                <p className='validdata'>
                  {valid ? "Invalid Credentials" : null}
                </p>
                <p className='validdata1'>
                  {mailcheck
                    ? "Password reset mail send,Kindly check mail"
                    : null}
                </p>
                <button
                  type='submit'
                  onClick={handleSubmit}
                >
                  Send Mail
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
        )}
      </Formik>
    </>
  );
}

export default ForgotPassword;
