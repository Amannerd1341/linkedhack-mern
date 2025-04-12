import api from './axiosConfig';

export const getAllHackathons = async () => {
  try {
    const response = await api.get('/hackathons');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch hackathons';
  }
};

export const createHackathon = async (hackathonData) => {
  try {
    const response = await api.post('/hackathons', hackathonData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create hackathon';
  }
};

export const joinHackathon = async (hackathonId) => {
  try {
    const response = await api.post(`/hackathons/${hackathonId}/join`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to join hackathon';
  }
};