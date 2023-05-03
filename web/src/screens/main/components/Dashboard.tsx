import { useCallback, useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Loader from '../../../components/Loader';

import { useItemsQuery, useAddToCartMutation } from '../../../gql/types';

export type DashboardProps = {
  category?: 'vegetable' | 'cheese' | 'fruit';
};

export default function Dashboard({ category }: DashboardProps) {
  const [offset, setOffset] = useState(0);

  const { data, loading, fetchMore } = useItemsQuery({ variables: { category, offset } });
  const [addToCart] = useAddToCartMutation();

  const onAddToCart = useCallback((itemId: string) => {
    addToCart({ variables: { input: { itemId } } });
  }, []);

  const onLoadMore = useCallback(() => {
    setOffset((_offset) => _offset + 5);
  }, []);

  useEffect(() => {
    setOffset(0);
  }, [category]);

  useEffect(() => {
    fetchMore({
      variables: {
        category,
        offset,
      },
    });
  }, [offset, category]);

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ mb: 4, overflowX: 'hidden', overflowY: 'auto', height: '100%', pl: 3, pr: 3, pt: 3 }}>
      <Stack spacing={2}>
        {data?.items.map(({ _id, title, description, price, inStock }) => (
          <ItemCard key={_id} {...{ title, description, price, inStock }} onAddToCart={onAddToCart} id={_id} />
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
        <Button onClick={onLoadMore} sx={{ fontSize: 18 }}>
          Load more
        </Button>
      </Box>
    </Box>
  );
}
