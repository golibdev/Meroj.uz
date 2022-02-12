const CryptoJs = require('crypto-js');
const { Admin } = require('../models')

exports.createAdmin = async () => {
   const username = process.env.ADMIN_USERNAME
   const password = process.env.PASSWORD
   const fullName = process.env.FULLNAME
   try {
      const admin = await Admin.findOne({ username: username })

      if(admin !== null) {
         return true
      }

      const newAdmin = new Admin({
         username,
         password: CryptoJs.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
         ),
         fullName
      })

      await newAdmin.save()

      console.log('-----------------')
      console.log('Admin created with')
      console.log(`FullName: ${fullName}`)
      console.log(`Username: ${username}`)
      console.log(`Password: ${password}`)
      console.log('-----------------')
   } catch (err) {
      console.log(err)
      return false
   }
}