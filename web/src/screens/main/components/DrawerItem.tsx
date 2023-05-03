import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export type DrawerItemProps = ListItemButtonProps & {
  title: string;
  children: React.ReactNode;
};

export default function DrawerItem({ title, children, ...rest }: DrawerItemProps) {
  return (
    <ListItemButton {...rest}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
