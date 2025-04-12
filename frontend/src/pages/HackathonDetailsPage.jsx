import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathonById } from '../api/hackathons';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { FaCalendarAlt, FaUsers, FaTrophy } from 'react-icons/fa';

const HackathonDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentHackathon, loading } = useSelector((state) => state.hackathons);

  useEffect(() => {
    dispatch(getHackathonById(id));
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        {currentHackathon?.name}
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Chip icon={<FaCalendarAlt />} label={`Start: ${new Date(currentHackathon?.startDate).toLocaleDateString()}`} />
        <Chip icon={<FaUsers />} label={`${currentHackathon?.participants?.length || 0} participants`} />
        {currentHackathon?.prize && <Chip icon={<FaTrophy />} label={`Prize: $${currentHackathon.prize}`} />}
      </Stack>

      <Typography variant="body1" paragraph>
        {currentHackathon?.description}
      </Typography>

      <Button variant="contained" color="primary">
        Join Hackathon
      </Button>
    </Box>
  );
};

export default HackathonDetailsPage;