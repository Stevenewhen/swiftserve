const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: { type: String},
   sortOrder: { type: Number },
   item: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
