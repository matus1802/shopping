import Typography from '@mui/material/Typography';

import Card, { CardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export type ItemInCartProps = CardProps & {
  id: string;
  title: string;
  count: number;
  price: number;
  inStock: number;
  onRemoveFromCart: (itemId: string) => void;
  onAddToCart: (itemId: string) => void;
};

export default function ItemInCart({
  id,
  title,
  count,
  onRemoveFromCart,
  onAddToCart,
  price,
  inStock,
}: ItemInCartProps) {
  return (
    <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent sx={{ display: 'flex', width: '100%', pb: 0 }}>
        <Typography color="#7a4d4a" gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography sx={{ marginLeft: 'auto' }} color="#7a4d4a" variant="subtitle2">
          {`${price.toFixed(2)}€`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          width: '100%',
          display: 'flex',
          pl: 2,
        }}
      >
        <Typography sx={{ marginRight: 'auto' }} color="#7a4d4a" variant="subtitle1">
          {`${count}x`}
        </Typography>
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <Button size="small" onClick={() => onRemoveFromCart(id)}>
            -
          </Button>
          <Button size="small" onClick={() => onAddToCart(id)} disabled={inStock < 1}>
            +
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
