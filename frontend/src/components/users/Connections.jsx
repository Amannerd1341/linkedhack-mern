import React, { useState, useEffect } from 'react';
import { getConnections } from '../../api/users';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Spinner from '../layout/Spinner';

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await getConnections();
        setConnections(data);
      } catch (error) {
        console.error('Failed to fetch connections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Connections ({connections.length})
      </Typography>
      <List>
        {connections.map((connection) => (
          <ListItem key={connection._id}>
            <ListItemAvatar>
              <Avatar src={connection.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={connection.name}
              secondary={connection.title}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConnectionsList;