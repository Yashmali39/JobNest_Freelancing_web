import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Findwork from './components/Findwork'
import Findfreelancers from './components/Findfreelancers'
import Login from './components/Login'
import Logout from './components/Logout'
import Signin from './components/Signin'
import Navbar from './components/Navbar'
import Postproject from './components/Postproject'
import FreelancerForm from './components/FreelancerForm'
import FreelancerProfile from './components/FreelancerProfile'
const router = createBrowserRouter(
  [
    {
      path: "/",
      element :
      <div>
        <Navbar/>
        <Home/>
      </div>

    },
    {
      path: "/findwork",
      element :
      <div>
        <Navbar/>
        <Findwork/>
      </div>

    },
    {
      path: "/findfreelancers",
      element :
      <div>
        <Navbar/>
        <Findfreelancers/>
      </div>
    },
    {
      path: "/login",
      element :
      <div>
        <Navbar/>
        <Login/>
      </div>
    },
    {
      path: "/logout",
      element :
      <div>
        <Navbar/>
        <Logout/>
      </div>
    },
    {
      path: "/signin",
      element :
      <div>
        <Navbar/>
        <Signin/>
      </div>
    },
   {
      path: "/freelancerform/:id",
      element :
      <div>
        <Navbar/>
        <FreelancerForm/>
      </div>
    },
    {
      path: "/freelancerprofile/:id",
      element :
      <div>
        <Navbar/>
        <FreelancerProfile/>
      </div>
    },
    {
      path: "/postproject",
      element :
      <div>
        <Navbar/>
        <Postproject/>
      </div>
    },
  ]
)

function App() {
  
  return (
    <>
    <div>
    <RouterProvider router={router}/>
    </div>
    </>
  )
}
export default App