const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
   count: {
      type: Number,
      required: true
   },
   book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
   },
   phoneNumber: {
      type: Number,
      required: true
   },
   status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1
   }
}, {
   timestamps: true
})

module.exports = model('Order', orderSchema);