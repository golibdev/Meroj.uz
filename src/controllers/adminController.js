const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const { Admin, Order } = require('../models')

exports.login = async (req, res) => {
   try {
      const {
         username,
         password
      } = req.body

      if(!username || !password) {
         return res.status(400).send({
            message: 'Please fill all the fields'
         })
      }

      const admin = await Admin.findOne({ username: username })

      if(!admin) return res.status(401).json({ message: "Ma'lumot mos kelmadi" })

      if(password.length < 6) return res.status(401).json({ message: "Parol 6 ta belgidan kam bo'lmasligi kerak" })
      
      const decryptPass = CryptoJs.AES.decrypt(
         admin.password,
         process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJs.enc.Utf8)

      if(password !== decryptPass) return res.status(401).json({ message: "Ma'lumot mos kelmadi" })

      const token = jwt.sign({
         id: admin._id
      }, process.env.TOKEN_SECRET_KEY)
      admin.password = undefined

      res.status(200).json({
         token,
         admin
      })
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: err.message
      })
   }
}

// get summary data for orders status
exports.getSummary = async (req, res) => {
   try {
      const getAllOrders = await Order.find()
      const newOrders = await Order.find({ status: 1 })
      const successOrders = await Order.find({ status: 2 })
      const failedOrders = await Order.find({ status: 3 })

      res.status(200).json({
         newOrders: newOrders.length,
         successOrders: successOrders.length,
         failedOrders: failedOrders.length,
         allOrders: getAllOrders.length
      })
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: err.message
      })
   }
}