import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';

const HackathonParticipation = () => {
  // Mock data - replace with real data from your API/state
  const hackathons = [
    { id: 1, name: 'Global Hack Week', date: '2023-10-15', skills: ['React', 'Node.js'] },
    { id: 2, name: 'AI Challenge', date: '2023-08-20', skills: ['Python', 'ML'] },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Hackathon Participation
      </Typography>
      {hackathons.map((hackathon) => (
        <Box key={hackathon.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">{hackathon.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(hackathon.date).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {hackathon.skills.map((skill, index) => (
              <Chip key={index} label={skill} size="small" />
            ))}
          </Box>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default HackathonParticipation;