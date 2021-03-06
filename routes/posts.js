var express = require('express');
var router = express.Router();
const PostController = require('../controller/PostController');

router.get('/', PostController.getPosts);

router.post('/', PostController.createPost)

router.patch('/:id', PostController.updatePost)

router.delete('/:id', PostController.deletePost)

router.patch('/:id/likepost', PostController.likePost)

module.exports = router;
