import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
