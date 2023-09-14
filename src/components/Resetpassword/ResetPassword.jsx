import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const forgotSchema = yup.object().shape({
  password: yup.string().required("*Required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password mismatch")
    .required("*Required"),
});

const initialValuesforgot = {
  password: "",
  confirmpassword: "",
};

function ResetPassword({ url }) {
  const { id } = useParams();
  const [invalid, setInvaild] = useState(false);
  const [resetdone, setResetdone] = useState(false);
  const Navigate = useNavigate();

  const passwordReset = async (values, onSubmitProps) => {
    try {
      await axios.patch(`${url}/user/resetPassword/${id}`, {
        password: values.password,
      });
      onSubmitProps.resetForm();
      setInvaild(false);
      setResetdone(true);
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    } catch (error) {
      onSubmitProps.resetForm();
      setResetdone(false);
      setInvaild(true);
      setTimeout(() => {
        Navigate("/forgotPassword");
      }, 1500);
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await passwordReset(values, onSubmitProps);
  };
  return (
    <>
      <>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesforgot}
          validationSchema={forgotSchema}
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
                  <h1>Password Reset</h1>
                </div>

                <div className='container'>
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

                  <label htmlFor='confirmpassword'>
                    <b>Confirm password</b>
                  </label>
                  <input
                    type='password'
                    placeholder='Confirm password'
                    name='confirmpassword'
                    value={values.confirmpassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <p className='error'>
                    {touched.confirmpassword ? errors.confirmpassword : null}
                  </p>
                  <p className='validdata'>{invalid ? "Link expired" : null}</p>
                  <p className='validdata1'>
                    {resetdone ? "Password reset done, Successfully" : null}
                  </p>

                  <button
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Reset
                  </button>
                  <div className='bottom'>
                    <Link to='/'>
                      <p>Login</p>
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
    </>
  );
}

export default ResetPassword;
