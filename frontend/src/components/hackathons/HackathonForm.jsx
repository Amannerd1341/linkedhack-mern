import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHackathon } from '../../store/slices/hackathonSlice';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { HACKATHON_CATEGORIES } from '../../utils/constants';

const HackathonForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    prize: '',
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createHackathon(formData)).unwrap();
      onSuccess();
    } catch (error) {
      console.error('Error creating hackathon:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Hackathon Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
        margin="normal"
      />
      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Prize Amount ($)"
        name="prize"
        type="number"
        value={formData.prize}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Categories"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        fullWidth
        margin="normal"
        SelectProps={{ multiple: true }}
      >
        {HACKATHON_CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Create Hackathon
      </Button>
    </Box>
  );
};

export default HackathonForm;