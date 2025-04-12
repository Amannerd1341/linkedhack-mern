import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/slices/authSlice';

const AlertNotification = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;