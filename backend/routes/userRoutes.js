const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Protect all routes after this middleware
router.use(authMiddleware.protect);

// Current user routes
router.get('/me', userController.getMe);
router.patch('/update-me', userController.updateUser);

// Connection routes
router.post('/connections', userController.sendConnectionRequest);

// Search route
router.get('/search', userController.searchUsers);

// Public user profile route (keep at bottom)
router.get('/:id', userController.getUser);

module.exports = router;