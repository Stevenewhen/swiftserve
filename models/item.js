
require('./category');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  itemNumber: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  imgLink: { type: String }
}, {
  timestamps: true
});

module.exports = itemSchema;
