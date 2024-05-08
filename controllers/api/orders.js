const Order = require('../../models/order');
// const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  getAllOrders,
  markOrderAsPrepared,
  getUnpreparedOrders,
  triage,
  getUnpaidOrders,
  markOrderAsPaid,
};

async function getUnpreparedOrders(req, res) {
  try {
    const unpreparedOrders = await Order.find({ isPrepared: false }).sort({ createdAt: -1 });
    res.json(unpreparedOrders);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function markOrderAsPrepared(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.isPrepared = true;
    order.isPaid = false;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error marking order as prepared:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllOrders(req, res) {
  const orders = await Order.find();
  res.json(orders);
}

async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}
    

async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.addItemToCart(req.params.id);
  res.json(cart);
}

async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setItemQty(req.body.itemId, req.body.newQty);
  res.json(cart);
}

async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}


async function triage(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    const newCart = new Order({ user: req.user._id });
    newCart.lineItems = cart.lineItems;
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    console.error('Error creating new cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function markOrderAsPaid(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.isPaid = true;
    await order.save();
    
    res.json(order);
  } catch (error) {
    console.error('Error marking order as paid:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUnpaidOrders(req, res) {
  const unpaidPreparedOrders = await Order.find({ isPaid: false, isPrepared: true });
  res.json(unpaidPreparedOrders)
}


