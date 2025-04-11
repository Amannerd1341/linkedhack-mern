const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware.protect);

router.route('/')
  .get(hackathonController.getAllHackathons)
  .post(hackathonController.createHackathon);

router.post('/:id/join', hackathonController.joinHackathon);

module.exports = router;