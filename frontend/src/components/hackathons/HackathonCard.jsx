import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { participateInHackathon } from '../../store/slices/hackathonSlice';
import { FaUsers, FaCalendarAlt, FaTrophy, FaCode } from 'react-icons/fa';
import { Button, Card, CardContent, Typography, Chip, Stack, Alert } from '@mui/material';
import { formatDate } from '../../utils/helpers';

const HackathonCard = ({ hackathon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const isParticipant = user && hackathon.participants.includes(user._id);

  const handleJoin = async () => {
    try {
      setError(null);
      setIsJoining(true);
      await dispatch(participateInHackathon(hackathon._id)).unwrap();
      navigate(`/hackathons/${hackathon._id}`);
    } catch (err) {
      setError(err.message || 'Failed to join hackathon');
    } finally {
      setIsJoining(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/hackathons/${hackathon._id}`);
  };

  return (
    <Card sx={{ mb: 3, ':hover': { boxShadow: 6 } }}>
      <CardContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="h5" component="div" gutterBottom>
          {hackathon.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <FaCalendarAlt /> {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          <FaUsers /> {hackathon.participants.length} participants
          {hackathon.prize > 0 && (
            <>
              {' | '}
              <FaTrophy /> ${hackathon.prize.toLocaleString()}
            </>
          )}
        </Typography>

        {hackathon.tags?.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
            {hackathon.tags.map((tag) => (
              <Chip
                key={tag}
                icon={<FaCode />}
                label={tag}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        )}

        <Typography variant="body1" paragraph>
          {hackathon.description.length > 150
            ? `${hackathon.description.substring(0, 150)}...`
            : hackathon.description}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleViewDetails}
            color="primary"
          >
            View Details
          </Button>

          {user && (
            <Button
              variant={isParticipant ? "outlined" : "contained"}
              onClick={handleJoin}
              disabled={isJoining || isParticipant}
              color="secondary"
            >
              {isJoining
                ? 'Joining...'
                : isParticipant
                ? 'Already Joined'
                : 'Join Hackathon'}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HackathonCard;