const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
// Create a new blog
const createBlog = async (req, res) => {
    const { title, content, author, category,image } = req.body;
    let imageUrl = '';
    
  
    try {
      // Upload image to Cloudinary if image is provided
  
      // Create new blog entry
      const newBlog = new Blog({
        title,
        content,
        author,
        category,
        image
      });
      
      
  
      await newBlog.save();
      res.status(201).json({ success: true, message: 'Blog created successfully', data: newBlog });
    } catch (error) {
        
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  const { title, content, author, category, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, category, image },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
