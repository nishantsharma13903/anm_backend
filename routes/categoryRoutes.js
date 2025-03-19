const express = require("express");
const { addCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/add", upload.single("image"), addCategory);
router.get("/", getCategories);  // ✅ Now accessible at `/api/categories`
router.put("/update/:id", upload.single("image"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
