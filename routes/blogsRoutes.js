// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../utils/validateRequest');
const blogValidator = require('../validations/blogValidation');
const blogController = require('../controllers/blogsController');

// Public
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/search', blogController.searchBlog);
router.get('/technology/:tech', blogController.blogByTechnology);
router.get('/:id/previous', blogController.previousBlog);
router.get('/:id/next', blogController.nextBlog);
router.post('/:id/like', blogController.likeBlog);
router.post('/:id/share', blogController.shareBlog);

// Authenticated
router.post('/',protect,validateRequest(blogValidator), blogController.createBlog);
router.put('/:id',protect, blogController.updateBlog);
router.delete('/:id',protect, blogController.deleteBlog);

module.exports = router;
