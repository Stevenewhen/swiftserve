const { Schema } = require('mongoose');

const itemSchema = new Schema({
  name: { type: String },
  description: { type: String, optional: true },
  price: { type: Number },
  itemNumber: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: 'Category', optional: true },
  imgLink: { type: String, optional: true }
}, {
  timestamps: true
});

module.exports = itemSchema;
