// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  featuredImageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String }],
  technologies: [{ type: String }],
  publicationDate: { type: Date, required: true },
  readTime: { type: String, required: true },
  writerAvatarUrl: { type: String, required: true },
  writerName: { type: String, required: true },
  writerLinkedinUrl: { type: String },
  bodyContent: { type: String, required: true },

  // Analytics fields
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },

  // Auto timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
