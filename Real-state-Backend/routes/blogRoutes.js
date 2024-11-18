const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController'); // Adjust path if necessary

// Define routes
router.post('/', BlogController.createBlog);
router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);
router.put('/:id', BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

module.exports = router;
