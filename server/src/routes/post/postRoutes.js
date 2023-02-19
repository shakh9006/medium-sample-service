const router = require('express').Router();
const PostController = require('../../controllers/PostController');

router.get('/post', PostController.getAll);
router.get('/post/:id', PostController.getPost);
router.post('/post', PostController.create);
router.post('/post/rating/', PostController.rating);
router.put('/post', PostController.update);
router.delete('/post/:id', PostController.delete);

module.exports = router;