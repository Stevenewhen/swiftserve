const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
  // 'this' keyword is bound to the lineItem document
  return this.qty * this.item.price;
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ordernum: { type: String, unique: true },
  lineItems: [lineItemSchema],
  isPaid: { type: Boolean, default: false },
  isPrepared: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.pre('save', async function(next) {
  try {
    if (!this.ordernum) {
      const orderCount = await this.constructor.countDocuments();
      const orderNumber = (orderCount + 1).toString().padStart(6, '0');
      this.ordernum = orderNumber;
    }
    next();
  } catch (error) {
    next(error);
  }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('orderQty').get(function() {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
  return this.findOneAndUpdate(
    // query object
    { user: userId, isPaid: false },
    // update doc - provides values when inserting
    { user: userId },
    // upsert option
    { upsert: true, new: true }
  );
};


orderSchema.methods.addItemToCart = async function (itemId) {
  const cart = this;
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    lineItem.qty += 1;
  } else {
    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);
    cart.lineItems.push({ item });
  }
  return cart.save();
};

orderSchema.methods.setItemQty = function(itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the index of the line item in the cart for the menu item
  const index = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));
  if (index !== -1 && newQty <= 0) {
    // Remove the lineItem from the cart.lineItems array using splice
    cart.lineItems.splice(index, 1);
  } else if (index !== -1) {
    // Set the new qty - positive value is assured thanks to the previous condition
    cart.lineItems[index].qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};


module.exports = mongoose.model('Order', orderSchema);
