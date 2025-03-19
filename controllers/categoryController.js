// const db = require("../config/db");

// // ➤ Add Category
// exports.addCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const image = req.file ? req.file.filename : null;

//     if (!name) return res.status(400).json({ error: "Category name is required" });

//     const [result] = await db.execute(
//       "INSERT INTO categories (name, description, image) VALUES (?, ?, ?)",
//       [name, description, image]
//     );

//     res.status(201).json({ message: "Category added successfully", categoryId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ➤ Get All Categories
// exports.getCategories = async (req, res) => {
//     try {
//       const [rows] = await db.execute("SELECT * FROM categories");
  
//       if (!Array.isArray(rows)) {
//         return res.status(500).json({ error: "Unexpected database response" });
//       }
  
//       res.json(rows);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  

// // ➤ Update Category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const [result] = await db.execute(
//       "UPDATE categories SET name = ?, description = ?, image = COALESCE(?, image) WHERE id = ?",
//       [name, description, image, id]
//     );

//     if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found" });

//     res.json({ message: "Category updated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ➤ Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await db.execute("DELETE FROM categories WHERE id = ?", [id]);

//     if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found" });

//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Category = require("../models/Category");

// ➤ Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name) return res.status(400).json({ error: "Category name is required" });

    const newCategory = new Category({ name, description, image });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", categoryId: newCategory._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, ...(image && { image }) },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
