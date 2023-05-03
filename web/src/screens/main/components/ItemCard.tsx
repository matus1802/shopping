import Typography from '@mui/material/Typography';

import Card, { CardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export type ItemCardProps = CardProps & {
  id: string;
  title: string;
  description: string;
  price: number;
  inStock: number;
  onAddToCart: (itemId: string) => void;
};

export default function ItemCard({ id, title, description, onAddToCart, price, inStock }: ItemCardProps) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography color="#7a4d4a" gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography color="#7a4d4a" variant="subtitle2">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          width: '100%',
          display: 'flex',
          p: 2,
        }}
      >
        <Typography sx={{ marginRight: 'auto' }} color="#7a4d4a" variant="subtitle1">
          {`${price.toFixed(2)}€`}
        </Typography>
        <Typography sx={{ marginRight: 'auto' }} color="#7a4d4a" variant="subtitle1">
          {`In stock - ${inStock.toFixed(0)}`}
        </Typography>
        <Button size="small" onClick={() => onAddToCart(id)} disabled={inStock < 1}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
