import { useEffect, useState } from 'react'
import { bookApi } from '../api/bookApi'
import InnerHtml from 'dangerously-set-html-content'
import HomeNavbar from '../components/HomeNavbar'
import { toast, ToastContainer } from 'react-toastify'
import { ordersApi } from '../api/ordersApi'
import Footer from '../components/Footer'

export const Home = () => {
   const [books, setBooks] = useState([])
   const [count, setCount] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [loading, setLoading] = useState(false)

   const getAllBooks = async () => {
      try {
         const res = await bookApi.getAll()
         setBooks(res.data.books.reverse())
         setLoading(true)
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      getAllBooks()
   }, [])

   const createOrder = async (e, book) => {
      e.preventDefault()

      const check = {
         phoneNumber: phoneNumber.length === 0,
         count: count.length === 0
      }

      if (check.phoneNumber || check.count) {
         toast.error('Barcha maydonlar to\'ldirilishi shart!')
         return
      }

      const params = {
         phoneNumber: Number(phoneNumber),
         count: Number(count),
         book
      }

      try {
         const res = await ordersApi.createOrder(params)
         toast.success('Ma\'lumotlar muvaffaqiyatli yozildi!')
         setPhoneNumber('')
         setCount('')
         setTimeout(() => {
            window.location.reload()
         }, 500)
      } catch (err) {
         console.log(err.response);
      }
   }
   return (
      <>
         <HomeNavbar/>
         <div className="container mt-4 mb-4" style={{ position: 'relative', top: '50px' }}>
            <div className="row">
               <div className='col-12 mt-4 mb-4 text-center'>
                  <h1 className='fw-bold text-uppercase'>barcha kitoblar</h1>
               </div>
               {loading ? (
                  books.map((item, index) => (
                     <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-3' key={index}>
                        <div className='card shadow rounded'>
                           <div className='card-header bg-white'>
                              <p className='card-title fw-bold'>{item.bookName}</p>
                           </div>
                           <div className='card-body'>
                              <img src={`http://localhost:4000/${item.image}`} alt={item.bookName} className='img-fluid' />
                           </div>
                           <div className='card-footer bg-white'>
                              <button className='btn btn-primary me-3' data-bs-toggle="modal" data-bs-target={`#view${item._id}`}>
                                 <i className='fas fa-shopping-cart'></i> Buyurtma qilish
                              </button>
                           </div>
                        </div>
                        <div className="modal fade" id={`view${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                           <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                 <div className="modal-header">
                                    <p className="modal-title" id="exampleModalLabel">{item.bookName}</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                 </div>
                                 <div className="modal-body">
                                    <img src={`http://localhost:4000/${item.image}`} className="img-fluid mb-3" />
                                    <InnerHtml html={item.description} />
                                    <button className='btn btn-primary' data-bs-target={`#view${index}`} data-bs-toggle="modal">
                                       Rasmiylashtirish
                                    </button>
                                 </div>
                                 <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                                 </div>
                              </div>   
                           </div>
                        </div>
                        <div className="modal fade" id={`view${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                           <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                 <div className="modal-header">
                                    <p className="modal-title" id="exampleModalLabel">Rasmiylashtirish</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                 </div>
                                 <div className="modal-body">
                                    <form onSubmit={(e) => {
                                       createOrder(e, item._id)
                                    }}>
                                       <div className='mb-3'>
                                          <label htmlFor="number" className='form-label'>Miqdorini kiriting</label>
                                          <input type="number" id='number' className='form-control' placeholder='Soni' value={count} onChange={e => setCount(e.target.value)} />
                                       </div>
                                       <div className='mb-3'>
                                          <label htmlFor="phoneNumber" className='form-label'>Telefon raqamingiz</label>
                                          <input type="number" id='phoneNumber' className='form-control' placeholder='+998' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                                       </div>
                                       <div>
                                          <button className='btn btn-success'>
                                             <i className='fas fa-shopping-cart'></i> Buyurtma qilish
                                          </button>
                                       </div>
                                    </form>
                                 </div>
                                 <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                                 </div>
                              </div>   
                           </div>
                        </div>
                     </div>
                  ))
               ): (
                  <div className="col-12 d-flex align-items-center justify-content-center" style={{ height: '58.5vh' }}>
                     <div className="spinner-border text-primary" style={{ width: '75px', height: '75px' }} role="status">
                        <span className="sr-only">Loading...</span>
                     </div>
                  </div>
               )}
            </div>
            <ToastContainer/>
         </div>
         <Footer/>
      </>
   )
}
