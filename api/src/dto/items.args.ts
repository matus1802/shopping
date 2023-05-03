import { Field, ArgsType } from '@nestjs/graphql';
import { Category } from '../db/items/item.schema';

@ArgsType()
export class ItemsArgs {
  @Field({ nullable: true })
  category?: Category.Vegetable | Category.Fruit | Category.Cheese;

  @Field({ nullable: true })
  offset?: number;

  @Field({ nullable: true })
  limit?: number;
}
