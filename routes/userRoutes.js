// routes/userRoutes.js
const express = require('express');
const { getAllUsers, searchUsers, addUser } = require('../controllers/userController');

const router = express.Router();

// Routes
router.get('/users', getAllUsers);
router.get('/users/search', searchUsers);
router.post('/users', addUser);

module.exports = router;