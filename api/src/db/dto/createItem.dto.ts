import { Category } from '../items/item.schema';

export class CreateItemDto {
  title: string;
  description: string;
  price: number;
  category: Category;
}
