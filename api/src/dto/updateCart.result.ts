import { ObjectType, Field } from '@nestjs/graphql';
import { Item } from '../db/items/item.schema';
import { User } from '../db/users/user.schema';

@ObjectType()
export class UpdateCartResult {
  @Field(() => User)
  user: User;

  @Field(() => Item)
  item: Item;
}
