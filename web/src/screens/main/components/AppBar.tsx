import { useCallback } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cart from './Cart';
import { useMeQuery } from '../../../gql/types';
import { GiDutchBike } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { httpToken } from '../../../gql/vars';
import { useNavigate } from 'react-router-dom';

export type AppBarProps = {
  title: string;
};

const AppBar = ({ title }: AppBarProps) => {
  const navigate = useNavigate();

  const { data } = useMeQuery();

  const onLogout = useCallback(() => {
    httpToken(null);
    navigate('/login');
  }, []);

  return (
    <Toolbar
      sx={{
        pr: '24px',
        top: 0,
        zIndex: 1100,
        position: 'absolute',
        width: 800,
        backgroundColor: '#7a4d4a',
        display: 'flex',
      }}
    >
      <Typography component="h1" variant="h6" noWrap color="#fee9ea">
        {title}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ ml: 'auto', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#00a9ea' }}>
          <GiDutchBike color="#fee9ea" />
        </Avatar>
        <Typography component="h1" variant="h6" noWrap color="#fee9ea">
          {data?.me.nickname}
        </Typography>
        <IconButton onClick={onLogout}>
          <IoIosLogOut color="#fee9ea" />
        </IconButton>
        <Cart />
      </Stack>
    </Toolbar>
  );
};

export default AppBar;
