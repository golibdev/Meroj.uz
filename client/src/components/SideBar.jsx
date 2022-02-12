import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
   const navElement = [
      {
         name: 'Bosh sahifa',
         route: '/admin',
         icon: 'fas fa-home'
      },
      {
         name: "Kitoblar",
         route: '/admin/books',
         icon: 'fas fa-book'
      },
      {
         name: "Buyurtmalar",
         route: '/admin/orders',
         icon: 'fas fa-shopping-cart'
      },
      {
         name: "Kategoriya",
         route: '/admin/categories',
         icon: 'fas fa-list'
      }
   ]
   return (
      <div id="layoutSidenav_nav">
         <nav className="sb-sidenav accordion bg-primary" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
               <div className="nav">
                  <div className="sb-sidenav-menu-heading text-white">Interface</div>
                  {navElement.map((item, index) => (
                     <Link key={index} to={item.route} className="nav-link nav-item-link text-white">
                        <div className="sb-nav-link-icon">
                           <i className={item.icon}></i>
                           </div> {item.name}
                     </Link>
                  ))}
               </div>
            </div>
         </nav>
      </div>
   )
}

export default SideBar