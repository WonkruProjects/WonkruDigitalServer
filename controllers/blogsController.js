// controllers/blogController.js
const Blog = require('../models/blog');

// 1. Create Blog
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({success:true, message: 'Blog created successfully.', data:blog });
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

// 2. Get All Blog
exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({
    success:true, message: 'Blogs fetched successfully.',
    data:blogs});
};

// 3. Get Blog by Id
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success:false,error: 'Blog not found' });
    
        // Increment views
        blog.views += 1;
        await blog.save();
    
        // Find related blogs (same categories or technologies, exclude current blog)
        const relatedBlogs = await Blog.find({
          _id: { $ne: blog._id },
          $or: [
            { categories: { $in: blog.categories } },
            { technologies: { $in: blog.technologies } }
          ]
        })
        .limit(3)
        .sort({ publicationDate: -1 });
    
        res.json({ success:true, message: 'Blog created successfully.',data:blog, relatedBlogs });
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};


// 4. Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
          req.params.id,
          { ...req.body, updatedAt: Date.now() },
          { new: true }
        );
        if (!blog) return res.status(404).json({ success:false,error: 'Blog not found' });
        res.json({success:true, message: 'Blog fetched successfully.', data:blog});
      } catch (err) {
        res.status(400).json({ success:false,error: err.message });
      }
};

// 5. Delete Lead
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};


// 6. Search Blog
exports.searchBlog = async (req, res) => {
    try {
        const { query } = req.query;
        const blogs = await Blog.find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        });
        res.json({success:true, message: 'Blog fetched successfully.', data:blogs});
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};

// 7. Blog By Technology
exports.blogByTechnology = async (req, res) => {
    try {
        const tech = req.params.tech;
        const blogs = await Blog.find({ technologies: tech });
        res.json({success:true, message: 'Blog fetched successfully.', data:blogs});
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};

// 8.  Next Blog
exports.nextBlog = async (req, res) => {
    try {
        const currentBlog = await Blog.findById(req.params.id);
        if (!currentBlog) return res.status(404).json({ error: 'Blog not found' });
    
        const nextBlog = await Blog.findOne({
          publicationDate: { $gt: currentBlog.publicationDate }
        }).sort({ publicationDate: 1 });
    
        res.json(nextBlog?{success:true, message: 'Blog fetched successfully.', data:nextBlog} :{success:false, message: 'No Next Blog'});
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};

// 8.  Previous Blog
exports.previousBlog = async (req, res) => {
    try {
        const currentBlog = await Blog.findById(req.params.id);
        if (!currentBlog) return res.status(404).json({ error: 'Blog not found' });
    
        const previousBlog = await Blog.findOne({
          publicationDate: { $lt: currentBlog.publicationDate }
        }).sort({ publicationDate: -1 });
    
        res.json(previousBlog?{success:true, message: 'Blog fetched successfully.', data:previousBlog} : {success:false, message: 'No Next Blog'});
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};

// 9.  Like Blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
          req.params.id,
          { $inc: { likes: 1 } },
          { new: true }
        );
        if (!blog) return res.status(404).json({success:false, error: 'Blog not found' });
        res.json({ success:true,message: 'Liked successfully', likes: blog.likes });
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};

// 10.  Share Blog
exports.shareBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
          req.params.id,
          { $inc: { shares: 1 } },
          { new: true }
        );
        if (!blog) return res.status(404).json({ success:false,error: 'Blog not found' });
        res.json({ success:true,message: 'Shared successfully', shares: blog.shares });
      } catch (err) {
        res.status(500).json({ success:false,error: err.message });
      }
};