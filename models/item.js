const mongoose = require('mongoose');

require('./category');
const itemSchema = require('./ItemSchema.js');

module.exports = mongoose.model('Item', itemSchema);