import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', mt: 'auto' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} LinkedHack - All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;