const User = require('../models/User');
const Hackathon = require('../models/Hackathon');

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('connections', 'name email title')
      .populate('hackathons', 'name startDate endDate');

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('connections', 'name email title')
      .populate('hackathons', 'name startDate endDate');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    // Filter out unwanted fields
    const filteredBody = {};
    const allowedFields = ['name', 'email', 'title', 'company', 'skills'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Send connection request
exports.sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already connected
    const currentUser = await User.findById(req.user.id);
    if (currentUser.connections.includes(userId)) {
      return res.status(400).json({ error: 'Already connected with this user' });
    }

    // Add to connections (in a real app, you'd have a pending requests system)
    currentUser.connections.push(userId);
    await currentUser.save();

    res.status(200).json({
      status: 'success',
      message: 'Connection request sent',
      data: {
        connections: currentUser.connections
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { skills: { $regex: query, $options: 'i' } }
      ]
    }).select('name email title company skills');

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};