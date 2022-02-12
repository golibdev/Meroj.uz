import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { categoryApi } from '../api/categoryApi'

const Categories = () => {
   const [name, setName] = useState('')
   const [categories, setCategories] = useState([])
   const [loading, setLoading] = useState(false)
   const [search, setSearch] = useState('')
   const [updateName, setUpdateName] = useState('')

   const getAll = async () => {
      try {
         const res = await categoryApi.getAll()
         setCategories(res.data.categories.reverse())
         setLoading(true)
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      getAll()
   }, [])

   const createCategory = async (e) => {
      e.preventDefault()
      const check = {
         name: name.trim().length === 0
      }

      if (check.name) {
         toast.error('Ma\'lumot kiritilmagan')
         return
      }

      const params = {
         name
      }

      try {
         await categoryApi.create(params)
         toast.success('Kategoriya muvaffaqiyatli yaratildi')
         getAll()
         window.location.reload()
      } catch (err) {
         console.log(err);
      }
   }

   const deleteCategory = async (e, id) => {
      try {
         await categoryApi.delete(id)
         toast.success('Kategoriya muvaffaqiyatli o\'chirildi')
         getAll()
      } catch (err) {
         console.log(err);
      }
   }

   const updateCategory = async (e, id) => {
      e.preventDefault()
      const check = {
         name: updateName.trim().length === 0
      }

      if (check.name) {
         toast.error('Ma\'lumot kiritilmagan')
         return
      }

      const params = {
         name: updateName
      }

      try {
         await categoryApi.update(id, params)
         toast.success('Kategoriya muvaffaqiyatli yangilandi')
         getAll()
         window.location.reload()
      } catch (err) {
         console.log(err);
      }
   }

   const filter = categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase()))
   return (
      <div className='row'>
         <div className='col-12 d-flex align-items-center justify-content-between mb-4'>
            <h5 className='fw-bold text-uppercase'>Kategoriyalar</h5>
            <div>
               <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create">
                  <i className='fas fa-plus'></i>
               </button>

               <div className="modal fade" id="create" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="exampleModalLabel">Kategoriya qo'shish</h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={createCategory}>
                              <div className='mb-3'>
                                 <input type="text" placeholder='Kategoriya' className="form-control" value={name} onChange={e => setName(e.target.value)} />
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
            <div className="card mb-4">
               <div className="card-header">
                  <input type="text" placeholder='Kategoriyani qidirish' className='mb-3 form-control' value={search} onChange={e => setSearch(e.target.value)} />
               </div>
               <div className="card-body">
                  <table className='table table-bordered text-center'>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Tahrirlash</th>
                           <th>O'chirish</th>
                        </tr>
                     </thead>
                     {categories.length > 0 ? (
                        <>
                           {loading ? (
                           <>
                              {search.length > 0 ? (
                                 <tbody>
                                    <>
                                       {filter.length > 0 ? (
                                          <>
                                             {filter.map((item, index) => (
                                                <tr key={index}>
                                                   <td>{item.name}</td>
                                                   <td>
                                                      <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#update${item._id}`} onClick={() => {
                                                         setUpdateName(item.name)
                                                      }}>
                                                         <i className='fas fa-edit'></i> Tahrirlash
                                                      </button>
                                                      <div className="modal fade" id={`update${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                         <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                               <div className="modal-header">
                                                                  <h5 className="modal-title" id="exampleModalLabel">Kategoriya tahrirlash</h5>
                                                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                               </div>
                                                               <div className="modal-body">
                                                                  <form onSubmit={(e) => {
                                                                     updateCategory(e, item._id)
                                                                  }}>
                                                                     <div className='mb-3'>
                                                                        <input type="text" placeholder='Kategoriya' className="form-control" value={updateName} onChange={e => setUpdateName(e.target.value)} />
                                                                     </div>
                                                                     <div className='mb-3'>
                                                                        <button className='btn btn-success d-block'>
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
                                                   </td>
                                                   <td>
                                                      <button className='btn btn-danger' onClick={e => {
                                                         deleteCategory(e, item._id)
                                                      }}>
                                                         <i className='fas fa-trash'></i> O'chirish
                                                      </button>
                                                   </td>
                                                </tr>
                                             ))}
                                          </>
                                       ): (
                                          <tr>
                                             <td colSpan='3'>
                                                <h5 className='text-center'>Kategoriyalar topilmadi</h5>
                                             </td>
                                          </tr>
                                       )}
                                    </>
                                 </tbody>
                              ): (
                                 <tbody>
                                    {categories.map((item, index) => (
                                       <tr key={index} className="fw-bolder">
                                          <td>{item.name}</td>
                                          <td>
                                             <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#update${item._id}`} onClick={() => {
                                                setUpdateName(item.name)
                                             }} >
                                                <i className='fas fa-edit'></i> Tahrirlash
                                             </button>
                                             <div className="modal fade" id={`update${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                   <div className="modal-content">
                                                      <div className="modal-header">
                                                         <h5 className="modal-title" id="exampleModalLabel">Kategoriya tahrirlash</h5>
                                                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      </div>
                                                      <div className="modal-body">
                                                         <form onSubmit={(e) => {
                                                            updateCategory(e, item._id)
                                                         }}>
                                                            <div className='mb-3'>
                                                               <input type="text" placeholder='Kategoriya' className="form-control" value={updateName} onChange={e => setUpdateName(e.target.value)} />
                                                            </div>
                                                            <div className='mb-3'>
                                                               <button className='btn btn-success d-block'>
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
                                          </td>
                                          <td>
                                             <button className='btn btn-danger' onClick={e=>{
                                                deleteCategory(e, item._id)
                                             }}>
                                                <i className='fas fa-trash'></i> O'chirish
                                             </button>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              )}
                           </>
                        ): (
                           <tbody>
                              <tr>
                                 <td colSpan='3'>Loading...</td>
                              </tr>
                           </tbody>
                        )}
                        </>
                     ): (
                        <tbody>
                           <tr>
                              <td colSpan='3'>Kategoriyalar mavjud emas</td>
                           </tr>
                        </tbody>
                     )}
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Categories