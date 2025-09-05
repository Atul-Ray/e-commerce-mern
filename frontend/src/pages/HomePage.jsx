import React from 'react'
import NavBar from '../components/NavBar'
import {useSelector} from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function HomePage() {

  const navigate =useNavigate();
const user=useSelector((state)=>state.auth.user)

  function handleLogOut(){
    toast.success("logged out");
    navigate('/login');
  }

  return (
    <div>
      <NavBar isAuthenticated={user} onLogout={handleLogOut}/>
      <Outlet/>
    </div>
  )
}

export default HomePage

