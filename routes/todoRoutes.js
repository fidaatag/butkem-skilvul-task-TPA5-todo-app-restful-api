const express = require('express');
const { getAllTodoController, getDetailTodoController ,createTodoController, updateTodoController, deleteTodoController, deleteAllTodoController } = require('../controllers/todoController');
const userAuth = require('../middleware/userAuth');
const router = express.Router();

router.get('/todo', userAuth, getAllTodoController);
router.post('/todo', userAuth, createTodoController);
router.delete('/todo', userAuth, deleteAllTodoController)
router.get('/todo/:todoId', userAuth, getDetailTodoController);
router.put('/todo/:todoId', userAuth, updateTodoController);
router.delete('/todo/:todoId', userAuth, deleteTodoController);

module.exports = router;