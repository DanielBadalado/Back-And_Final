const express = require('express');
const router = express.Router();
const usersController = require('../controllers/sersController');

router.get('/', sersController.getAll);
router.get('/:id', sersController.getById);
router.post('/', sersController.create);
router.put('/:id', sersController.update);
router.delete('/:id', sersController.delete);

module.exports = router;
