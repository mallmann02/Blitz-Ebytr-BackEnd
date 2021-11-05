const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', TaskController.findAll);

router.post('/', TaskController.create);

module.exports = router;
