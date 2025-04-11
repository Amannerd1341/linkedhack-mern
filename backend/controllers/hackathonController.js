const Hackathon = require('../models/Hackathon');

exports.createHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate, location, prize, tags } = req.body;
    
    const newHackathon = await Hackathon.create({
      name,
      description,
      startDate,
      endDate,
      location,
      organizer: req.user.id,
      prize,
      tags
    });

    res.status(201).json({
      status: 'success',
      data: {
        hackathon: newHackathon
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate('organizer', 'name email title')
      .populate('participants', 'name email title');

    res.status(200).json({
      status: 'success',
      results: hackathons.length,
      data: {
        hackathons
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.joinHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    // Check if user already joined
    if (hackathon.participants.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already joined this hackathon' });
    }

    // Add user to participants
    hackathon.participants.push(req.user.id);
    await hackathon.save();

    res.status(200).json({
      status: 'success',
      data: {
        hackathon
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};