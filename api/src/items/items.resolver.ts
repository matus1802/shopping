import { Resolver, Query, Args } from '@nestjs/graphql';
import { Item } from '../db/items/item.schema';
import { ItemsArgs } from '../dto/items.args';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], { name: 'items' })
  items(@Args() input: ItemsArgs) {
    return this.itemsService.find(input);
  }
}
