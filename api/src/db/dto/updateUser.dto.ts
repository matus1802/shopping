import { Item } from '../items/item.schema';

export class UpdateUserDto {
  itemsInCart?: Item[];
  nickname?: string;
}
