const router = require('express').Router();
const UserController = require("../../controllers/UserController");

router.get('/users/:id', UserController.getUser);
router.get('/users/', UserController.getAll);

module.exports = router;
