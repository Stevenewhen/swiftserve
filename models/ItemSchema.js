const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },  // assuming name should be required
  description: { type: String },  // optional by default
  price: { type: Number, required: true },  // assuming price should be required
  itemNumber: { type: Number, required: true },  // assuming itemNumber should be required
  category: { type: Schema.Types.ObjectId, ref: 'Category' },  // optional by default
  imgLink: { type: String }  // optional by default
}, {
  timestamps: true
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

module.exports = Item;
