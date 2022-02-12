import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthentification } from '../handlers/isAuth'
import { toast, ToastContainer } from 'react-toastify'
import { authApi } from '../api/authApi'

const Login = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate()

   const token = localStorage.getItem('token')
   const isAuth = isAuthentification(token)

   useEffect(() => {
      if(isAuth === undefined) {
         navigate('/admin');
      } else {
         navigate('/admin/login');
      }
   }, [navigate])

   const login = async (e) => {
      e.preventDefault()

      const check = {
         username: username.trim().length === 0,
         password: password.trim().length === 0
      }

      if(check.username || check.password) {
         toast.error('Iltimos barcha maydonlarni to\'ldiring')
         return
      }

      if(password.length < 6) {
         toast.error('Parol 6 ta belgidan iborat bo\'lishi kerak')
         return
      }

      const params = {
         username,
         password
      }

      try {
         const res = await authApi.login(params)
         localStorage.setItem('token', res.data.token)
         localStorage.setItem('fullName', res.data.admin.fullName)
         window.location.href = '/admin'
      } catch(err) {
         console.log(err.response);
      }
   }
   return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
         <div className='container'>
            <div className='row'>
               <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offsset-sm-1 col-12'>
                  <div className="card shadow-lg border-0 rounded-lg">
                     <div className="card-header bg-white">
                        <h3 className="text-center font-weight-light">Kirish</h3></div>
                     <div className="card-body">
                        <form onSubmit={login}>
                           <div className="form-floating mb-3">
                              <input className="form-control" id="inputEmail" type="text" placeholder="name@example.com" value={username} onChange={e => setUsername(e.target.value)} />
                              <label htmlFor="inputEmail">Username</label>
                           </div>
                           <div className="form-floating mb-3">
                              <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                              <label htmlFor="inputPassword">Password</label>
                           </div>
                           <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                              <button className="btn btn-primary">Kirish</button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer/>
      </div>
   )
}

export default Login