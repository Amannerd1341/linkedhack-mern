import api from './axiosConfig';

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch user profile';
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update profile';
  }
};

export const getConnections = async () => {
  try {
    const response = await api.get('/users/connections');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch connections';
  }
};
export const searchUsers = async (query) => {
    try {
      const response = await api.get(`/users/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Search failed';
    }
  };