const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   books: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
   }]
}, {
   timestamps: true
})

module.exports = model('Category', categorySchema);