
const Post = require('../models/post');
const Comment = require('../models/comment');

async function getPosts(req, res) {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createPost(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addLike(req, res) {
  try {
    const result = await Post.addLike(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addComment(req, res) {
  try {
    const newComment = await Comment.create(req.params.id, req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getPosts,
  createPost,
  getPostById,
  addLike,
  addComment,
};
