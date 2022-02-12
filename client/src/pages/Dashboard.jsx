import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { ordersApi } from '../api/ordersApi'
import Pagination from '../components/Pagination'
import Statistics from '../components/Statistics'

const Dashboard = () => {
   const [orders, setOrders] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [perPage, setPerPage] = useState(10)
   const [isLoading, setIsLoading] = useState(false)
   const [summary, setSummary] = useState({})

   const fetchData = async () => {
      try {
         const response = await authApi.getSummary()
         setSummary(response.data)
      } catch (err) {
         console.log(err);
      }
   }
   const getAllOrders = async () => {
      try {
         const res = await ordersApi.getTodaysOrders()
         setOrders(res.data.orders.reverse())
         setIsLoading(true)
      } catch (err) {
         console.log(err.response);
      }
   }

   useEffect(() => {
      fetchData()
      getAllOrders()
   }, [])

   // get Current orders
   const indexOfLastOrder = currentPage * perPage
   const indexOfFirstOrder = indexOfLastOrder - perPage
   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

   const paginate = numberPage => setCurrentPage(numberPage)

   const submitOrder = async (e, id) => {
      e.preventDefault()
      try {
         await ordersApi.statusChangeOrder(id, 2)
         getAllOrders()
         fetchData()
      } catch (err) {
         console.log(err.response)
      }
   }

   const cancelOrder = async (e, id) => {
      e.preventDefault()
      try {
         await ordersApi.statusChangeOrder(id, 3)
         getAllOrders()
         fetchData()
      } catch (err) {
         console.log(err.response)
      }
   }
   const dashboardPanel = [
      {
         name: "Barcha kitoblar",
         link: "/admin/books"
      },
      {
         name: "Barcha buyurtmalar",
         link: "/admin/orders"
      },
      {
         name: "Barcha kategoriyalar",
         link: "/admin/categories"
      }
   ]
   return (
      <div className='row'>
         {dashboardPanel.map((item, index) => (
            <div className='col-lg-4 col-md-6 col-12 mb-3' key={index}>
               <div className="card bg-primary text-white mb-4">
                  <div className="card-body d-flex align-items-center justify-content-between">
                     <p className='fw-bold'>{item.name}</p>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                     <Link className="small text-white text-decoration-none" to={item.link}>Ko'rish</Link>
                     <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                  </div>
               </div>
            </div>
         ))}
         <div className='col-12'>
            <h5 className='fw-bold mb-3'>Bugungi buyurtmalar</h5>
            <div className="row">
               <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                  <select className='form-select' value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="25">25</option>
                     <option value="50">50</option>
                  </select>   
               </div>
            </div>
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
                              <td colSpan='7'>
                                 <h6 className='text-center'>
                                    Bugun buyurtmalar mavjud emas
                                 </h6>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
                  {currentOrders.length > 0 ? (
                     <Pagination 
                        perPage={perPage} 
                        paginate={paginate} 
                        total={orders.length} 
                        setCurrentPage={setCurrentPage} 
                        currentPage={currentPage} 
                     />
                  ): <></>}
               </div>
            ): (
               <div className='d-flex justify-content-center'>
                  <div className='spinner-border' role='status'>
                     <span className='sr-only'>Loading...</span>
                  </div>
               </div>
            )}
         </div>
         <Statistics summary={summary} />
      </div>
   )
}

export default Dashboard