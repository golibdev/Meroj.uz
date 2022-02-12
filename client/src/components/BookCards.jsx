import {useEffect, useState, useRef} from 'react'
import { toast } from 'react-toastify';
import SunEditor from 'suneditor-react';
import { bookApi } from '../api/bookApi';
import { categoryApi } from '../api/categoryApi';
import InnerHtml from 'dangerously-set-html-content'

export const BookCards = ({ item, deleteBook }) => {
   const [books, setBooks] = useState([])
   const [categories, setCategories] = useState([])
   const [updateBookName, setUpdateBookName] = useState('')
   const [updateDescription, setUpdateDescription] = useState('')
   const [updateCategory, setUpdateCategory] = useState('')
   const [updateImage, setUpdateImage] = useState('')
   const getAllCategory = async () => {
      try {
         const res = await categoryApi.getAll()
         setCategories(res.data.categories.reverse())
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      getAllCategory()
   }, [])

   const updateBook = async (e, id) => {
      e.preventDefault()
      const check = {
         bookName: updateBookName.trim().length === 0,
         description: updateDescription.trim().length === 0,
         category: updateCategory.trim().length === 0,
      }

      if (check.bookName || check.description || check.category) {
         toast.error('Barcha ma`lumotlarni to`ldiring')
         return
      }

      const formData = new FormData()
      formData.append('bookName', updateBookName)
      formData.append('description', updateDescription)
      formData.append('category', updateCategory)
      formData.append('image', updateImage)

      try {
         const res = await bookApi.update(id, formData)
         toast.success(res.data.message)
         setTimeout(() => {
            window.location.reload()
         }, 500)
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-3'>
         <div className='card shadow rounded'>
            <div className='card-header bg-white'>
               <p className='card-title fw-bold'>{item.bookName}</p>
            </div>
            <div className='card-body'>
               <img src={`http://localhost:4000/${item.image}`} alt={item.bookName} className='img-fluid' />
            </div>
            <div className='card-footer bg-white text-center'>
               <button className='btn btn-primary me-3' data-bs-toggle="modal" data-bs-target={`#view${item._id}`}>
                  <i className='fas fa-eye'></i>
               </button>
               <button className='btn btn-warning me-3 text-white' data-bs-toggle="modal" data-bs-target={`#update${item._id}`} onClick={() => {
                  setUpdateBookName(item.bookName)
                  setUpdateCategory(item.category._id)
                  setUpdateDescription(item.description)
                  setUpdateImage(`${item.image}`)
               }}>
                  <i className='fas fa-pen'></i>
               </button>
               <button className='btn btn-danger me-3' onClick={e => {
                  deleteBook(e, item._id)
               }}>
                  <i className='fas fa-trash'></i>
               </button>
            </div>
         </div>

         <div className="modal fade" id={`update${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Kitobni tahrirlash</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form encType='multipart/form-data' onSubmit={(e) => {
                        updateBook(e, item._id)
                     }}>
                        <div className='mb-3'>
                           <input type="text" placeholder='Kitob nomi' className="form-control" value={updateBookName} onChange={e => setUpdateBookName(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                           <input type="file" className="form-control" id="image" name="image" defaultValue={updateImage} onChange={e => setUpdateImage(e.target.files[0])}/>
                        </div>
                        <div className='mb-3'>
                           <SunEditor
                              defaultValue={item.description}
                              value={updateDescription}
                              onChange={(e) => setUpdateDescription(e)}
                              className="form-control"
                              placeholder="Kitob haqida ma'lumot"
                              setOptions={{
                                 height: '200px',
                              }}
                           />
                        </div>
                        <div className='mb-3'>
                           <select className="form-control" value={updateCategory} onChange={e => setUpdateCategory(e.target.value)}>
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
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
