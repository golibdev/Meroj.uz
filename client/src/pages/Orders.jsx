import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ordersApi } from '../api/ordersApi'
import Pagination from '../components/Pagination'

export const Orders = () => {
   const [orders, setOrders] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [perPage, setPerPage] = useState(10)
   const getAllOrders = async () => {
      try {
         const res = await ordersApi.getAllOrders()
         setOrders(res.data.orders.reverse())
         setIsLoading(true)
      } catch (err) {
         console.log(err.response);
      }
   }

   useEffect(() => {
      getAllOrders()
   }, [])

   const indexOfLastOrder = currentPage * perPage
   const indexOfFirstOrder = indexOfLastOrder - perPage
   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

   const paginate = numberPage => setCurrentPage(numberPage)

   const submitOrder = async (e, id) => {
      e.preventDefault()
      try {
         await ordersApi.statusChangeOrder(id, 2)
         getAllOrders()
      } catch (err) {
         console.log(err.response)
      }
   }

   const cancelOrder = async (e, id) => {
      e.preventDefault()
      try {
         await ordersApi.statusChangeOrder(id, 3)
         getAllOrders()
      } catch (err) {
         console.log(err.response)
      }
   }

   return (
      <div className='row'>
         <div className='col-12 d-flex align-items-center justify-content-between mb-4'>
            <h5 className='fw-bold text-uppercase'>Barcha buyurtmalar</h5>
         </div>
         <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
            <select className='form-select' value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
               <option value="1">1</option>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="25">25</option>
               <option value="50">50</option>
            </select>   
         </div>
         <div className='col-12'>
            {isLoading ? (
               <div className='table-responsive'>
                  <table className='table table-striped table-bordered table-hover text-center' id='table'>
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Kitob nomi</th>
                           <th>Buyurtma soni</th>
                           <th>Buyurtmachi telefon raqami</th>
                           <th>Buyurtma statusi</th>
                           <th>Topshirish</th>
                           <th>Bekor qilish</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentOrders.length > 0 ? (
                           currentOrders.map((order, index) => (
                              <tr key={index}>
                                 <td>{currentPage === 1 ? index + 1 : index  + (currentPage - 1) * perPage + 1}</td>
                                 <td>{order.book.bookName}</td>
                                 <td>{order.count}</td>
                                 <td>{order.phoneNumber}</td>
                                 {order.status === 1 ? (
                                    <td className='bg-warning text-white'>Yangi</td>
                                 ): order.status === 2 ? (
                                    <td className='bg-success text-white'>Yetkazib berilgan</td>
                                 ): (
                                    <td className='bg-danger text-white'>Bekor qilingan</td>
                                 )}
                                 <td>
                                    {order.status > 1 ? (
                                       <button className='btn btn-success me-2' disabled>
                                          <i className='fas fa-check'></i>
                                       </button>
                                    ): (
                                       <button className='btn btn-success me-2'
                                          onClick={(e) => {
                                             submitOrder(e, order._id)
                                          }}
                                       >
                                          <i className='fas fa-check'></i>
                                       </button>
                                    )}
                                 </td>
                                 <td>
                                    {order.status > 1 ? (
                                       <button className='btn btn-danger' disabled>
                                          <i className='fas fa-times'></i>
                                       </button>
                                    ): (
                                       <button className='btn btn-danger' onClick={(e) => {
                                          cancelOrder(e, order._id)
                                       }}>
                                          <i className='fas fa-times'></i>
                                       </button>
                                    )}
                                 </td>
                              </tr>
                           ))
                        ): (
                           <tr>
                              <td colSpan='5'>
                                 <h3 className='text-center'>Buyurtmalar yo'q</h3>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
                  <Pagination
                     perPage={perPage} 
                     paginate={paginate} 
                     total={orders.length}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage} 
                  />
               </div>
            ): (
               <div className='d-flex justify-content-center'>
                  <div className='spinner-border' role='status'>
                     <span className='sr-only'>Loading...</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   )   
}
