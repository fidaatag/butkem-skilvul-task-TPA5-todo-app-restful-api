const express = require('express');
const { userLoginController, userRegisterController} = require('../controllers/userController');
const router = express.Router();

router.post('/login', userLoginController);
router.post('/register', userRegisterController);

module.exports = router;