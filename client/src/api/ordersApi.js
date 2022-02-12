import axios from "axios";
const token = localStorage.getItem("token"); 
const baseUrl = "http://localhost:4000/api/v1/orders/";

export const ordersApi = {
   getAllOrders: () => axios.get(
      baseUrl, 
      { 
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
         } 
      }
   ),
   getTodaysOrders: () => axios.get(
      baseUrl + "todays",
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   statusChangeOrder: (id, status) => axios.put(
      `${baseUrl}${id}/?status=${status}`,
      {
         headers: {
            'Content-Type': 'application/json',
         }
      }
   ),
   createOrder: (order) => axios.post(
      baseUrl,
      order,
      {
         headers: {
            'Content-Type': 'application/json'
         }
      }
   )
}