import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ForgotPassword from './components/Forgotpassword/ForgotPassword'
import Activate from './components/Activateuser/Activate'
import ResetPassword from './components/Resetpassword/ResetPassword'
import WaveVideo from './components/Home/WaveVideo'
import Upload from './components/Upload/Upload'

function App() {

  const url="https://waveupload.onrender.com"

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login url={url}/>}/>
        <Route path='/register' element={<Register url={url}/>}/>
        <Route path='/waveUpload/activate/:id' element={<Activate url={url}/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword url={url}/>}/>
        <Route path='/waveUpload/forgotPassword/:id' element={<ResetPassword url={url}/>}/>
        <Route path='/waveUpload' element={<WaveVideo url={url}/>}/>
        <Route path='/waveUpload/upload' element={<Upload url={url}/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
