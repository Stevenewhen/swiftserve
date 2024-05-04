require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/Item');

require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {
   try {
      // Delete existing categories
      await Category.deleteMany({});

      // Create categories
      const categories = await Category.create([
         { name: 'Appetizer' },
         { name: 'Box Sushi' },
         { name: 'Lunch Specials' },
         { name: 'Salads' },
         { name: 'Sashimi' },
         { name: 'Soups' },
         { name: 'Sushi Combination' },
         { name: 'Sushi - 2 Pieces' },
         { name: 'Sushi Rolls' }
      ]);

      // Log the categories
      console.log('Categories:', categories);

      // Optionally, you can also log the category IDs for reference
      const categoryIds = categories.map(category => category._id);
      console.log('Category IDs:', categoryIds);

      // Exit the process
      process.exit();
   } catch (error) {
      console.error('Error seeding categories:', error);
      process.exit(1); // Exit with a non-zero code to indicate failure
   }
})();


