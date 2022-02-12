import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './appLayout/AppLayout'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Books from './pages/Books';
import { Orders } from './pages/Orders';
import { Home } from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/login' element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path='admin' element={<AppLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/admin/categories" element={<Categories/>} />
          <Route path="/admin/books" element={<Books/>} />
          <Route path='/admin/orders' element={<Orders/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
