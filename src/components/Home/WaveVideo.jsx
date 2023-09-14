import Navbar from "../Navbar/Navbar";
import "./Wavevideo.css";
import Main from "../HomeMain/Main";

function WaveVideo({ url }) {


  return (
    <div className='home'>
      <Navbar />
      <Main url={url}/>
    </div>
  );
}

export default WaveVideo;
