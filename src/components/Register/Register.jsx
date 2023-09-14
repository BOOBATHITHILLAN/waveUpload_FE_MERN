import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const registerSchema = yup.object().shape({
  name: yup.string().required("*Required"),
  email: yup.string().email("invalid email").required("*Required"),
  password: yup.string().required("*Required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
};

function Register({ url }) {
  const [mailcheck, setMailcheck] = useState(false);
  const [exist, setExist] = useState(false);
  const Navigate = useNavigate();

  const handleRegister = async (values, onSubmitProps) => {
    try {
      await axios.post(`${url}/user/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setExist(false);
      setMailcheck(true);
      onSubmitProps.resetForm();
      setTimeout(() => {
        Navigate("/");
      }, 4000);
    } catch (error) {
      setMailcheck(false);
      setExist(true);
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleRegister(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='formContainer'>
              <div className='imgcontainer'>
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
              </div>

              <div className='container'>
                <label htmlFor='name'>
                  <b>Name</b>
                </label>
                <input
                  type='text'
                  placeholder='Enter Name'
                  name='name'
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                <p className='error'>{touched.name ? errors.name : null}</p>

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

                <label htmlFor='psw'>
                  <b>Password</b>
                </label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                <p className='error'>
                  {touched.password ? errors.password : null}
                </p>
                <p className='validdata'>
                  {exist ? "Email exist, Try with new Mail id" : null}
                </p>
                <p className='validdata1'>
                  {mailcheck
                    ? "Kindly check your mail to activate account"
                    : null}
                </p>

                <button
                  type='submit'
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <div className='bottom'>
                  <Link to='/'>
                    <p>Login</p>
                  </Link>
                  <Link to='/'>
                    <p>Cancel</p>
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

export default Register;
