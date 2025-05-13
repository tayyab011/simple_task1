
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'

import Signup from './components/Signup'
import Home from './page/Home'
import Profile from './page/Profile'
import UpdateProfile from './components/UpdateProfile';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/updateProfile" element={<UpdateProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
