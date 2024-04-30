const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/user.controller');

//router object
const router = express.Router()

router.get('/all-users',getAllUsers)

// CREATE user || post 
router.post('/register',registerController);

// login || post 
router.post ('/login',loginController);


module.exports= router;