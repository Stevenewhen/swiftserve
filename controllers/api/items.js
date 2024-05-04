const Item = require('../../models/item'); // Adjusted import

module.exports = {
   index,
   show,
   create,
   edit: editItem,
   delete: remove,
};

async function index(req, res) {
    try {
       const items = await Item.find();
       res.json(items);
    } catch (err) {
       console.error('Error fetching items:', err);
       res.status(500).json({ error: 'Error fetching items', details: err.message });
    }
 }

async function show(req, res) {
   try {
      const item = await Item.findById(req.params.id)
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json(item);
   } catch (err) {
      console.error('Error showing item:', err);
      res.status(500).json({ error: 'Error showing item', details: err.message });
   }
}

async function create(req, res) {
   const item = new Item({
     name: req.body.name,
     itemNumber: req.body.itemNumber,
     price: req.body.price,
     user: req.user._id,
     category: req.body.category,
   });

   if (req.body.description) {
     item.description = req.body.description;
   }

   try {
     await item.save();
     const showItem = await Item.findById(item._id);
     res.json(showItem);
   } catch (err) {
     res.status(500).json({ error });
   }
 }
 
 async function editItem(req, res) {
   try {
     const itemId = req.params.id;
     const item = await Item.findById(itemId);
     
     if (!item) return res.status(404).json({ error: 'Item not found' });
 
     item.itemNumber = req.body.itemNumber;
     item.name = req.body.name;
     item.description = req.body.description;
     item.price = req.body.price;
     item.category = req.body.category;
 
     const updatedItem = await item.save();
     res.json(updatedItem);
   } catch (err) {
     res.status(500).json({ error: 'Error updating item', details: err.message });
   }
 }
 


 async function remove(req, res) {
   try {
      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      if (req.user && req.user.isAdmin) {
         await Item.findByIdAndDelete(req.params.id);
         return res.json({ message: 'Item deleted successfully' });
      } else {
         return res.status(403).json({ error: 'Not authorized' });
      }
   } catch (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Error deleting item', details: err.message });
   }
}


