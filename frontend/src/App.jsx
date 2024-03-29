import Login from './pages/login/login'
import SignUp from './pages/signup/SignUp'
import './App.css'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useAuthContex } from './context/AuthContex'
import axios from 'axios'


function App() {
  const {authUser} = useAuthContex();
  axios.defaults.withCredentials = true;
  return (
      <div className='p-4 h-screen flex items-center justify-center bg-white'> 
       <Routes>
        <Route path='/' element={authUser?<Home />:<Navigate to={"/login"} />} />
        <Route path='/login' element={authUser?<Navigate to={"/"}/>:<Login />} />
        <Route path='/signup' element={authUser?<Navigate to={"/"}/>:<SignUp/>} />
       </Routes>
        <Toaster/>
      </div> 
  )
}

export default App
