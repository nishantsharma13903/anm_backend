// const db = require("../config/db");

// const getTotalUsers = (req, res) => {
//     const query = "SELECT COUNT(*) AS totalUsers FROM users";
//     db.query(query, (err, result) => {
//         if (err) {
//             console.error("❌ Error fetching total users:", err.message);
//             return res.status(500).json({ error: "Database error", details: err.message });
//         }
//         res.json({ totalUsers: result[0].totalUsers });
//     });
// };

// const getRecentUsers = (req, res) => {
//     const query = `SELECT id, full_name, email, status
//                    FROM users 
//                    WHERE created_at >= NOW() - INTERVAL 1 DAY 
//                    ORDER BY created_at DESC 
//                    LIMIT 10`;

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error("❌ Error fetching recent users:", err.message);
//             return res.status(500).json({ error: "Database error", details: err.message });
//         }

//         if (results.length === 0) {
//             return res.json({ users: "No users added recently" });
//         }

//         res.json({ users: results });
//     });
// };

// const getAllUsers = (req, res) => {
//     const query = "SELECT id, full_name, email, status FROM users";

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error("❌ Error fetching all users:", err.message);
//             return res.status(500).json({ error: "Database error", details: err.message });
//         }

//         if (results.length === 0) {
//             return res.json({ users: "No users found" });
//         }

//         res.json({ users: results });
//     });
// };

// module.exports = { getTotalUsers, getRecentUsers, getAllUsers };

const Category = require("../models/Category");
const User = require("../models/User");

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

// ➤ Get Total Users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get Recent Users
exports.getRecentUsers = async (req, res) => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const users = await User.find({ createdAt: { $gte: oneDayAgo } })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id fullName email status");

    if (!users.length) {
      return res.json({ users: "No users added recently" });
    }

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id fullName email status");

    if (!users.length) {
      return res.json({ users: "No users found" });
    }

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
