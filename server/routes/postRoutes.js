
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.post('/:id/like', postController.addLike);
router.post('/:id/comment', postController.addComment);

module.exports = router;
