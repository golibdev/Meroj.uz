import React from 'react'

const Pagination = ({ perPage, total, paginate, setCurrentPage, currentPage }) => {
   const pageNumbers = []

   for(let i=1; i <= Math.ceil(total / perPage); i++) {
      pageNumbers.push(i)
   }


   const nextClick = () => {
      setCurrentPage(currentPage + 1)
   }
   const prevClick = () => {
      setCurrentPage(currentPage - 1)
   }
   
   return (
      <nav>
         <ul className='pagination'>
            {currentPage === 1 ? (
               <li className='page-item disabled'>
                  <a className='page-link'>
                     <span aria-hidden="true">&laquo;</span>
                  </a>
               </li>
            ): (
               <li className='page-item'>
                  <a onClick={prevClick} className='page-link'>
                     <span aria-hidden="true">&laquo;</span>
                  </a>
               </li>
            )}
            {pageNumbers.map(number => (
               <li key={number} className="page-item">
                  <a onClick={() => paginate(number)} className={currentPage === number ? 'page-link bg-primary text-white' : 'page-link'}>{number}</a>
               </li>
            ))}
            {currentPage === pageNumbers[pageNumbers.length - 1] ? (
               <li className='page-item disabled'>
                  <a className='page-link'>
                     <span aria-hidden="true">&raquo;</span>
                  </a>
               </li>
            ): (
               <li className='page-item'>
                  <a onClick={nextClick} className='page-link'>
                     <span aria-hidden="true">&raquo;</span>
                  </a>
               </li>
            )}
         </ul>
      </nav>
   )
}

export default Pagination