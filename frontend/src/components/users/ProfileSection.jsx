import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../api/users';
import { fetchCurrentUser } from '../../store/slices/authSlice';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  Divider,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    bio: '',
    skills: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        title: user.title || '',
        company: user.company || '',
        bio: user.bio || '',
        skills: user.skills?.join(', ') || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await updateProfile({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      });
      dispatch(fetchCurrentUser());
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !user) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'background.paper', 
      borderRadius: 2, 
      boxShadow: 1,
      mb: 3
    }}>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={formData.avatar}
                sx={{ width: 100, height: 100 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper'
                  }}
                >
                  <CameraAltIcon />
                </IconButton>
              </label>
            </Box>
          </Box>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, UI/UX"
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="h6" color="text.secondary">
                  {user.title} {user.company && `at ${user.company}`}
                </Typography>
              </Box>
            </Box>
            <Button 
              onClick={() => setEditMode(true)} 
              startIcon={<EditIcon />}
              variant="outlined"
            >
              Edit Profile
            </Button>
          </Box>

          {user.bio && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="body1" paragraph>
                {user.bio}
              </Typography>
            </>
          )}
          
          {user.skills?.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {user.skills.map((skill, i) => (
                    <Chip key={i} label={skill} />
                  ))}
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfileSection;