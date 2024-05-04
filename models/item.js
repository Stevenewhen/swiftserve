const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String },
  description: { type: String, optional: true },
  price: { type: Number  },
  itemNumber: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: 'Category', optional: true },
}, {
  timestamps: true
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
