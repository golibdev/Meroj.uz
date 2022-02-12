const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
   bookName: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
   }],
}, {
   timestamps: true
})

module.exports = model('Book', bookSchema);