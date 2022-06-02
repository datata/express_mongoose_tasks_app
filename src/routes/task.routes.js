const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/verifyToken');
const router = express.Router();

router.get('/tasks', auth, taskController.getTasks);
router.get('/tasks/:id', auth, taskController.getTaskById);
router.post('/tasks', auth, taskController.createTask);
router.put('/tasks/:id', auth, taskController.updateTask);
router.delete('/tasks/:id', auth, taskController.deleteTask);
router.put('/tasks/status/:id', auth, taskController.updateTaskStatus);

module.exports = router;