import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material';
import { fetchCurrentUser } from '../store/slices/authSlice';
import ProfileSection from '../components/users/ProfileSection';
import ConnectionsList from '../components/users/ConnectionsList';
import Spinner from '../components/layout/Spinner';




const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  if (status === 'loading') return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { md: '3fr 1fr' },
        gap: 4
      }}>
        <Box>
          <ProfileSection />
        </Box>
        <Box>
          <ConnectionsList />
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;