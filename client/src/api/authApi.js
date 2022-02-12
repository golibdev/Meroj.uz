import axios from 'axios';
const baseUrl = 'http://localhost:4000/api/v1/admin/';

export const authApi = {
   login: params => axios.post(
      baseUrl + 'login',
      params
   ),
   getSummary: () => axios.get(
      baseUrl + 'summary',
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
      }
   )
}