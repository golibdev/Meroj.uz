const { model, Schema } = require('mongoose');

const adminSchema = new Schema({
   fullName: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minlength: 6
   }
}, {
   timestamps: true
})

module.exports = model('Admin', adminSchema);