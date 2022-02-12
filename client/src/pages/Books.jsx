import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { bookApi } from '../api/bookApi'
import { categoryApi } from '../api/categoryApi'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { BookCards } from '../components/BookCards';
import Pagination from '../components/Pagination';

const Books = () => {
   const [categories, setCategories] = useState([])
   const [books, setBooks] = useState([])
   const [bookName, setBookName] = useState('')
   const [description, setDescription] = useState('')
   const [category, setCategory] = useState('')
   const [image, setImage] = useState('')
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [perPage, setPerPage] = useState(5)

   const getAllCategory = async () => {
      try {
         const res = await categoryApi.getAll()
         setCategories(res.data.categories.reverse())
      } catch (err) {
         console.log(err);
      }
   }

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
      getAllCategory()
      getAllBooks()
   }, [])

   const indexOfLastOrder = currentPage * perPage
   const indexOfFirstOrder = indexOfLastOrder - perPage
   const currentBooks = books.slice(indexOfFirstOrder, indexOfLastOrder)
   const paginate = numberPage => setCurrentPage(numberPage)

   const createBook = async (e) => {
      e.preventDefault()
      const check = {
         bookName: bookName.trim().length === 0,
         description: description.trim().length === 0,
         category: category.trim().length === 0,
      }
      if (check.bookName || check.description || check.category || check.image) {
         toast.error('Barcha ma`lumotlarni to`ldiring')
         return
      }

      const formData = new FormData()
      formData.append('bookName', bookName)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('image', image)

      try {
         await bookApi.create(formData)
         toast.success('Kitob muvaffaqiyatli yaratildi')
         setBookName('')
         setDescription('')
         setCategory('')
         setImage('')
         setTimeout(() => {
            window.location.reload()
         }, 500)
      } catch (err) {
         console.log(err.response);
      }
   }

   const deleteBook = async (e, id) => {
      e.preventDefault()
      try {
         const res = await bookApi.delete(id)
         toast.success(res.data.message)
         getAllBooks()
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className='row'>
         <div className='col-12 d-flex align-items-center justify-content-between mb-4'>
            <h5 className='fw-bold text-uppercase'>Kitoblar</h5>
            <div>
               <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create">
                  <i className='fas fa-plus'></i>
               </button>

               <div className="modal fade" id="create" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="exampleModalLabel">Kitob qo'shish</h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={createBook} encType='multipart/form-data'>
                              <div className='mb-3'>
                                 <input type="text" placeholder='Kitob nomi' className="form-control" value={bookName} onChange={e => setBookName(e.target.value)} />
                              </div>
                              <div className='mb-3'>
                                 <input type="file" className="form-control" id="image" name="image" onChange={e => setImage(e.target.files[0])}/>
                              </div>
                              <div className='mb-3'>
                                 <SunEditor
                                    value={description}
                                    onChange={setDescription}
                                    className="form-control"
                                    placeholder="Kitob haqida ma'lumot"
                                    setOptions={{
                                       height: '200px',
                                    }}
                                 />
                              </div>
                              <div className='mb-3'>
                                 <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value=''>Kategoriyani tanlang</option>
                                    {categories.map(item => (
                                       <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className='mb-3'>
                                 <button className='btn btn-success'>
                                    <i className='fas fa-save'></i> Saqlash
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
         </div>
         <div className='col-12'>
            <div className="row">
               <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                  <select className='form-select' value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="20">20</option>
                  </select>   
               </div>
            </div>
         </div>
         {loading ? (
            <>
               {currentBooks.map(item => (
                  <BookCards key={item._id} item={item} deleteBook={deleteBook} />
               ))}
               <Pagination
                  currentPage={currentPage}
                  total={books.length}
                  perPage={perPage}
                  setCurrentPage={setCurrentPage}
                  paginate={paginate}
               />
            </>
         ): (
            <div className='col-12 d-flex justify-content-center'>
               <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
               </div>
            </div>
         )}
      </div>
   )
}

export default Books