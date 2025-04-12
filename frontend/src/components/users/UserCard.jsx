import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Card className="user-card">
      <CardContent>
        <div className="user-header">
          <Avatar src={user.avatar} alt={user.name} />
          <div className="user-info">
            <Typography variant="h6" component={Link} to={`/users/${user._id}`}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.company}
            </Typography>
          </div>
        </div>
        {user.skills?.length > 0 && (
          <div className="user-skills">
            <Typography variant="body2">
              Skills: {user.skills.join(', ')}
            </Typography>
          </div>
        )}
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 2 }}
        >
          Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;