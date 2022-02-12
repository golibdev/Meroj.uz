import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { isAuthentification } from '../handlers/isAuth'

const AppLayout = () => {
   const token = localStorage.getItem('token')
   const navigate = useNavigate()

   const isAuth = isAuthentification(token)

   useEffect(() => {
      if(isAuth == false) {
         return navigate('/')
      } 
   }, [navigate])
   return (
      <>
         <Navbar/>
         <div id='layoutSidenav'>
            <SideBar/>
            <div id='layoutSidenav_content'>
               <main>
                  <div className='container-fluid px-4 mt-4'>
                     <Outlet/>
                     <ToastContainer/>
                  </div>
               </main>
            </div>
         </div>
      </>
   )
}

export default AppLayout