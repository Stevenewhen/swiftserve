require('dotenv').config();
require('./config/database'); // Ensure database is configured correctly

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {
  try {
    // Delete all existing categories
    await Category.deleteMany({});

    // Create categories
    const categories = await Category.create([
      { name: "Appetizer", sortOrder: 10 },
      { name: "Box Sushi", sortOrder: 20 },
      { name: "Lunch Specials", sortOrder: 30 },
      { name: "Combos", sortOrder: 40 },
      { name: "Salads", sortOrder: 50 },
      { name: "Sashimi", sortOrder: 60 },
      { name: "Soups", sortOrder: 70 },
      { name: "Sushi Combination", sortOrder: 80 },
      { name: "Sushi", sortOrder: 90 },
      { name: "Sushi Rolls", sortOrder: 100 }
    ]);

    // Delete all existing items
    await Item.deleteMany({});

    // Create items
    const items = await Item.create([
      // Appetizers
      { name: "Baked Salmon", price: 4.95, category: categories.find(c => c.name === "Appetizer")._id },
      { name: "Edamame", price: 3.50, category: categories.find(c => c.name === "Appetizer")._id },
      { name: "Salmon Tartar", price: 4.95, category: categories.find(c => c.name === "Appetizer")._id },
      { name: "Shrimp Tempura", price: 4.95, category: categories.find(c => c.name === "Appetizer")._id },
      { name: "Eggplant Shrimp w/ Miso Sauce", price: 4.95, category: categories.find(c => c.name === "Appetizer")._id },
      // Box Sushi Items
      { name: 'BBQ Eel Box', price: 6.75, category: categories.find(c => c.name === 'Box Sushi')._id },
      { name: 'Salmon Box', price: 6.95, category: categories.find(c => c.name === 'Box Sushi')._id },
      { name: 'Shrimp Box', price: 6.25, category: categories.find(c => c.name === 'Box Sushi')._id },
      { name: 'Tuna Box', price: 7.95, category: categories.find(c => c.name === 'Box Sushi')._id },
      { name: 'Yellowtail Box', price: 7.25, category: categories.find(c => c.name === 'Box Sushi')._id },
    ]);

    console.log("Items:", items);
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with error status code
  }
})();
