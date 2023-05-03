import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from './components/Drawer';
import AppBar from './components/AppBar';
import Dashboard from './components/Dashboard';
import { useMeQuery } from '../../gql/types';
import Loader from '../../components/Loader';

export type MainProps = {
  category: 'vegetable' | 'fruit' | 'cheese';
};

export default function Main({ category }: MainProps) {
  const { loading } = useMeQuery();

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ display: 'flex', width: 800, height: '100vh', alignSelf: 'center' }}>
      <CssBaseline />
      <AppBar title="Shopping" />
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '64px' }}>
        <Drawer category={category} />
        <Box maxWidth="lg" sx={{ flex: 1 }}>
          <Dashboard category={category} />
        </Box>
      </Box>
    </Box>
  );
}
