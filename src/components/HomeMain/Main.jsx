import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

function Main({url}) {
    const [videos, setVideos] = useState([]);
    const [allvideos, setAllvideos] = useState([]);
    const [render, setRender] = useState(false);
    const [update,setUpdate]=useState(false)
    const getData = async () => {
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token) } };
      const res = await axios.get(`${url}/api/videos`, config);
      setVideos(res.data);
    };
    const videoUrlchange = async () => {
      if (videos) {
        setAllvideos(
          videos.map((video) => {
            return {
              ...video,
              videoUrl: `${url}/public/videos/${video.filename}`,
            };
          })
        );
      }
      setTimeout(() => {
        if (!render) {
          setRender(true);
        }
      }, 1000);
    };
    useEffect(() => {
      getData();
      videoUrlchange();
    }, [render]);
  
    useEffect(()=>{
      setTimeout(() => {
        if(render){
          setRender(false)
        }
      }, 500);
    },[update])
  
  
    const handleDelete=async(id)=>{
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token) } };
      console.log(token)
      axios.delete(`${url}/api/videos/${id}`,config);
      update==true?setUpdate(false):setUpdate(true);
      setTimeout(() => {
        videoUrlchange()
      }, 1000);
    }
    
  return (
    <div className='videocontainer'>
      {allvideos.length>0 ? (
        allvideos.map((video) => {
          return (
            <div
              key={video._id}
              className='videodiv'
            >
              <div className='videoheader'>
                <h4>Title: {video.title} </h4>
                <p onClick={() => handleDelete(video._id)}>
                  <AiFillDelete />
                </p>
              </div>

              <video
                src={video.videoUrl}
                controls
                className='videocontrol'
              ></video>
              <p className='videodescription'>
                <span>Description:</span> {video.description}
              </p>
            </div>
          );
        })
      ) : (
        <h1>Data unavailable</h1>        
      )}
    </div>
  );
}

export default Main;
