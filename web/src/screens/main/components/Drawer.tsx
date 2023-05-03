import { useCallback } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { GiFruitBowl, GiChiliPepper, GiCheeseWedge } from 'react-icons/gi';
import DrawerItem from './DrawerItem';
import { useNavigate } from 'react-router-dom';

export type DrawerProps = {
  category?: 'vegetable' | 'cheese' | 'fruit';
};

export default function Drawer({ category }: DrawerProps) {
  const navigate = useNavigate();

  const onDrawerItemClicked = useCallback((category: string) => {
    navigate(`/${category}`);
  }, []);

  return (
    <Box style={{ width: 240 }}>
      <List component="nav">
        <DrawerItem
          title="Vegetable"
          selected={category === 'vegetable'}
          onClick={() => onDrawerItemClicked('vegetable')}
        >
          <GiChiliPepper />
        </DrawerItem>
        <DrawerItem title="Fruit" selected={category === 'fruit'} onClick={() => onDrawerItemClicked('fruit')}>
          <GiFruitBowl />
        </DrawerItem>
        <DrawerItem title="Cheese" selected={category === 'cheese'} onClick={() => onDrawerItemClicked('cheese')}>
          <GiCheeseWedge />
        </DrawerItem>
      </List>
    </Box>
  );
}
