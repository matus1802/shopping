import { useState, useMemo, useCallback, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { GiShoppingCart } from 'react-icons/gi';
import { useMeQuery, useAddToCartMutation, useRemoveFromCartMutation, useBuyMutation, Item } from '../../../gql/types';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import ItemInCart from './ItemInCart';

import Typography from '@mui/material/Typography';

type CartItems = {
  all: { [id in string]: Pick<Item, 'title' | '_id' | 'inStock'> & { count: number; price: number } };
  price: number;
};

export default function CartModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useMeQuery();

  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToCart] = useAddToCartMutation();
  const [buy] = useBuyMutation();

  const items: CartItems = useMemo(() => {
    if (data?.me.itemsInCart) {
      return data.me.itemsInCart.reduce<CartItems>(
        (prev, { _id, title, price, inStock }) => {
          if (prev.all[_id]) {
            prev.all[_id].count++;
            prev.all[_id].price += price;
          } else {
            prev.all[_id] = {
              _id,
              price,
              title,
              inStock,
              count: 1,
            };
          }
          prev.price += price;
          return prev;
        },
        { all: {}, price: 0 },
      );
    } else return { all: {}, price: 0 };
  }, [data]);

  useEffect(() => {
    setLoading(false);
  }, [modalOpen]);

  useEffect(() => {
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  }, [loading]);

  const onRemoveFromCart = useCallback((itemId: string) => {
    removeFromCart({ variables: { input: { itemId } } });
  }, []);

  const onAddToCart = useCallback((itemId: string) => {
    addToCart({ variables: { input: { itemId } } });
  }, []);

  const onBuy = useCallback(() => {
    setLoading(true);
    buy();
  }, []);

  return (
    <>
      <Tooltip title={`${data?.me.itemsInCart.length} items - ${items.price.toFixed(2)}€`}>
        <IconButton onClick={() => setModalOpen(true)}>
          <Badge
            badgeContent={data?.me.itemsInCart.length}
            sx={{
              '& .MuiBadge-badge': {
                color: 'lightgreen',
                backgroundColor: '#9c27b0',
              },
            }}
          >
            <GiShoppingCart color="#fee9ea" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Paper
          elevation={4}
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            maxHeight: '80%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: '#ffffff',
            overflowX: 'hidden',
            overflowY: 'auto',
            p: 4,
          }}
        >
          <Typography variant="h4">Cart</Typography>
          <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
            {Object.values(items.all).map(({ _id, ...rest }) => (
              <ItemInCart id={_id} key={_id} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} {...rest} />
            ))}
          </Stack>
          <Divider />
          <Box sx={{ display: 'flex', width: '100%', mt: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography sx={{ ml: 'auto' }} variant="h6">
              {`${items.price.toFixed(2)}€`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', mt: 2 }}>
            <LoadingButton
              loading={loading}
              sx={{ ml: 'auto' }}
              size="small"
              onClick={onBuy}
              disabled={Object.keys(items.all).length === 0}
            >
              Buy
            </LoadingButton>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
