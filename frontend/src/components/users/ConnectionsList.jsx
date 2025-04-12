import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';

const ConnectionsList = () => {
  const { connections } = useSelector((state) => state.users);

  return (
    <div>
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
    </div>
  );
};

export default ConnectionsList;