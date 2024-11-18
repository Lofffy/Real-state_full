const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authentication');

const UserController = require('../controllers/UserController');

// Route to create a new user
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/profile', protect, UserController.getUserProfile);
router.put('/profile', protect, UserController.updateUserProfile);
router.get('/profile/:userId', UserController.viewUserProfile);





module.exports = router;
