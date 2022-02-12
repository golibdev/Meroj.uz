import React from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

const Statistics = ({ summary }) => {
   ChartJS.register(ArcElement, Tooltip, Legend)
   const data = {
      labels: [
         `Yangi buyurtmalar`,  
         `Topshirilgan buyurtmalar`,  
         `Bekor qilingan buyurtmalar`,  
      ],
      datasets: [
         {
            label: 'Buyurtmalar statistikasi',
            data: [
               Math.floor(summary.newOrders * 100 / summary.allOrders),
               Math.floor(summary.successOrders * 100 / summary.allOrders),
               Math.floor(summary.failedOrders * 100 / summary.allOrders),
            ],
            backgroundColor: [
               'rgba(242,183,7, 0.5)',
               'rgba(24,128,80, 0.5)',
               'rgba(220,53,69, 0.5)'
            ],
            borderColor: [
               'rgba(242,100,1, 1)',
               'rgba(24,128,80, 1)',
               'rgba(220,53,69, 1)'
            ],
            borderWidth: 1
         }
      ]
   }
   return (
      <div className='col-lg-4 col-md-6 col-12 mt-3 mb-3'>
         <h5 className='fw-bold mb-3'>Statistika</h5>
         <Pie
            data={data}
            options={{
               plugins: {
                  legend: {
                     position: 'bottom'
                  }
               }
            }}
         />
      </div>
   )
}

export default Statistics