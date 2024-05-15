const Item = require('../../models/item');

module.exports = {
  index,
  show,
  create,
  edit: editItem,
  delete: remove,
};

async function index(req, res) {
 try {
   const items = await Item.find().sort('name').populate('category').exec();
   const filteredItems = items.filter(item => item.category);
   filteredItems.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
   res.json(filteredItems);
 } catch (error) {
   console.error('Error fetching items:', error);
   res.status(500).json({ error: 'Internal server error' });
 }
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}

async function create(req, res) {
 const item = new Item({
   name: req.body.name,
   itemNumber: req.body.itemNumber,
   price: parseFloat(req.body.price).toFixed(2),
   user: req.user._id,
   category: req.body.category,
   imgLink: req.body.imgLink,
 });

 if (req.body.description) {
   item.description = req.body.description;
 }

 try {
   await item.save();
   await item.populate('category')
   res.json(item);
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
}


async function editItem(req, res) {
  try {
    const itemId = req.params.id;
    const itemUpdates = {
      itemNumber: req.body.itemNumber,
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price).toFixed(2),
      category: req.body.category,
      imgLink: req.body.imgLink
    };

    // Using `findByIdAndUpdate` with options `{ new: true }` to return the updated document
    const updatedItem = await Item.findByIdAndUpdate(itemId, itemUpdates, { new: true })
      .populate('category'); // Populate the category field to return the full category object

    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Error updating item', details: err.message });
  }
}


async function remove(req, res) {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (req.user && (req.user.isAdmin || (item.user && item.user.toString() === req.user._id.toString()))) {
     await Item.findByIdAndDelete(req.params.id);
     return res.json({ message: 'Item deleted successfully' });
  } else {
     return res.status(403).json({ error: 'Not authorized' });
  }
}
