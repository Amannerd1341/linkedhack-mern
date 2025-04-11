const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teams: [{
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    project: String
  }],
  prize: { type: Number },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);