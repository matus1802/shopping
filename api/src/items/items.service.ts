import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsDao, GetItemsParams } from '../db/items/items.dao';

import { Item } from '../db/items/item.schema';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsDao: ItemsDao) {}

  async find(params: GetItemsParams): Promise<Item[] | null> {
    return this.itemsDao.find(params);
  }

  async decreaseInStock(_id: string) {
    const item = await this.itemsDao.findOne(_id);
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }
    item.inStock = item.inStock ? item.inStock - 1 : item.inStock;
    await item.save();
    return item;
  }

  async increaseInStock(_id: string) {
    const item = await this.itemsDao.findOne(_id);
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }
    item.inStock = item.inStock < 2 ? item.inStock + 1 : item.inStock;
    await item.save();
    return item;
  }

  async resetInStock(_id): Promise<Item> {
    const item = await this.itemsDao.findAndUpdateOne(_id, { inStock: 2 });
    return item;
  }
}
