import axios from 'axios';
const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:4000/api/v1/books/';
export const bookApi = {
   getAll: () => axios.get(
      baseUrl,
      {
         headers: {
            'Content-Type': 'application/json',
         }
      }
   ),
   getOne: (id) => axios.get(
      `${baseUrl}${id}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   create: params => axios.post(
      baseUrl,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   update: (id, params) => axios.put(
      `${baseUrl}${id}`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   delete: (id) => axios.delete(
      `${baseUrl}${id}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   )
}