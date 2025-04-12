import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LinkedHack
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/hackathons">Hackathons</Button>
            <Button color="inherit" component={Link} to="/network">Network</Button>
            <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/auth">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;