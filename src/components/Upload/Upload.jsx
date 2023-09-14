import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Upload({ url }) {
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token) } };
      await axios.post(`${url}/api/upload`, formData, config);
      setError(false);
      setUploaded(true);
      setTimeout(() => {
        Navigate("/waveUpload");
      }, 1500);
    } catch (error) {
      setUploaded(false);
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleUpload(e)}>
        <div className='formContainer'>
          <div className='imgcontainer'>
            <h1>Upload Video</h1>
            <p>Please fill in this form to upload video.</p>
          </div>
          <div className='container'>
            <label htmlFor='title'>
              <b>Title</b>
            </label>
            <input
              type='text'
              placeholder='Enter title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor='description'>
              <b>Description</b>
            </label>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='5'
              value={description}
              placeholder='Video description'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor='file'>
              <b>Video_File</b>
            </label>
            <input
              type='file'
              placeholder='Choose video file'
              name='video'
              id='file'
              onChange={(e) => setVideo(e.target.files[0])}
              required
            />
            <p className='validdata'>{error ? "Video upload failed" : null}</p>
            <p className='validdata1'>{uploaded ? "Video uploaded" : null}</p>
            <button type='submit'>Upload</button>
            <div className='bottom'>
              <Link to='/waveUpload'>
                <p>Home</p>
              </Link>
              <Link to='/waveUpload'>
                <p>Cancel</p>
              </Link>
            </div>
          </div>
        </div>
      </form>

      {/* <Formik
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
                <h1>Upload Video</h1>
                <p>Please fill in this form to upload video.</p>
              </div>

              <div className='container'>
                <label htmlFor='title'>
                  <b>Title</b>
                </label>
                <input
                  type='text'
                  placeholder='Enter title'
                  name='title'
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                <p className='error'>{touched.title ? errors.title : null}</p>

                <label htmlFor='description'>
                  <b>Description</b>
                </label>
                <textarea
                  name='description'
                  id='description'
                  cols='30'
                  rows='5'
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Video description'
                ></textarea>
                <p className='error'>
                  {touched.description ? errors.description : null}
                </p>

                <label htmlFor='file'>
                  <b>Video_File</b>
                </label>
                <input
                  type='file'
                  placeholder='Choose video file'
                  name='video'
                  id='file'                  
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange;
                    setVideo(e.target.files[0]);
                  }}
                  required
                />
                <p className='error'>{!video ? errors.file : null}</p>
                <p className='validdata'>
                  {exist ? "Email exist, Try with new Mail id" : null}
                </p>
                <p className='validdata1'>
                  {uploaded ? "Video uploaded" : null}
                </p>

                <button
                  type='submit'
                  onClick={handleSubmit}
                >
                  Upload
                </button>
                <div className='bottom'>
                  <Link to='/waveUpload'>
                    <p>Home</p>
                  </Link>
                  <Link to='/waveUpload'>
                    <p>Cancel</p>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik> */}
    </>
  );
}

export default Upload;
