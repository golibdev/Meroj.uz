import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
   return (
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary shadow fixed-top" style={{top: '0'}}>
         <div className="container">
            <a className="navbar-brand" href="#">
               <img src="/assets/images/logo4.png" width="100" className='img-fluid' alt="logo" />
            </a>
            <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="fas fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className="nav-link active text-white fw-bold text-uppercase" aria-current="page" to="/">Bosh sahifa</Link>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link text-white fw-bold text-uppercase" href="https://t.me/merojuz_bot" target="_blank">Bizning telegram bot</a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default HomeNavbar