import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../handlers/isAuth'

const Navbar = () => {
   const fullName = localStorage.getItem('fullName')
   const navigate = useNavigate()
   const logoutHandler = (e) => {
      e.preventDefault()
      logout(navigate)
   }
   return (
      <nav className="sb-topnav navbar navbar-expand navbar-primary bg-primary">
         <Link className="navbar-brand ps-3" to="/admin">
            <img className='img-fluid' width="120" src="/assets/images/logo2.png" alt="logo" />
         </Link>
         <button className="btn btn-link text-white btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
         <ul className="navbar-nav d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle text-white" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
               <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><p className="dropdown-item">{fullName}</p></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/" onClick={logoutHandler}>Chiqish</a></li>
               </ul>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar