const Category = require('../../models/category');

module.exports = {
   index,
   show,
   create,
   edit: editCategory,
   delete: remove,
};

async function index(req, res) {
    try {
       const categories = await Category.find();
       res.json(categories);
    } catch (err) {
       console.error('Error fetching categories:', err);
       res.status(500).json({ error: 'Error fetching categories', details: err.message });
    }
 }

async function show(req, res) {
   try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.json(category);
   } catch (err) {
      console.error('Error showing category:', err);
      res.status(500).json({ error: 'Error showing category', details: err.message });
   }
}

async function create(req, res) {
   const category = new Category({
      name: req.body.name,
      description: req.body.description,
      sortOrder: req.body.sortOrder,
   });

   try {
      await category.save();
      const showCategory = await Category.findById(category._id);
      res.json(showCategory);
   } catch (err) {
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'Error creating category', details: err.message });
   }
}

async function editCategory(req, res) {
   try {
      const categoryId = req.params.id.toString();
      const category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ error: "Category not found" });

      category.name = req.body.name;
      category.description = req.body.description;
      category.sortOrder = req.body.sortOrder;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
   } catch (err) {
      console.error('Error updating category:', err);
      res.status(500).json({ error: 'Error updating category', details: err.message });
   }
}

 
 async function remove(req, res) {
   try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      if (req.user && req.user.isAdmin) {
         await Category.findByIdAndDelete(req.params.id);
         return res.json({ message: 'Category deleted successfully' });
      } else {
         return res.status(403).json({ error: 'Not authorized' });
      }
   } catch (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ error: 'Error deleting category', details: err.message });
   }
}
