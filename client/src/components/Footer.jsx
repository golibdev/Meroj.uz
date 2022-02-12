import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <div className='footer bg-primary pt-3 pb-3' style={{ position: 'relative', top: '50px' }}>
         <div className='container text-center'>
            <p className='fw-bold text-white'>
            &copy; {new Date().getFullYear()} Barcha xuquqlar <Link className='text-white' to='/'>Meroj.uz</Link> tomonidan himoyalangan.
            </p>
         </div>
      </div>
   )
}

export default Footer