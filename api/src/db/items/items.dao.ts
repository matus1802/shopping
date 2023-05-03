import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from '../dto/createItem.dto';
import { Category } from './item.schema';
import { UpdateItemDto } from '../dto/updateItem.dto';

export type Pagination = {
  limit?: number;
  offset?: number;
};

export type GetItemsParams = Pagination & {
  category?: Category;
};

@Injectable()
export class ItemsDao {
  constructor(@InjectModel(Item.name) private itemsModel: Model<Item>) {}

  async create(dto: CreateItemDto): Promise<ItemDocument | null> {
    return this.itemsModel.create(dto);
  }

  async findOne(_id: string): Promise<ItemDocument | null> {
    return this.itemsModel.findOne({ _id });
  }

  async find(params: GetItemsParams): Promise<ItemDocument[] | null> {
    const { limit = 5, offset = 0, category = undefined } = params;
    const filter = category ? { category } : undefined;
    const items = await this.itemsModel.find(filter, undefined, {
      sort: 'title',
      skip: offset,
      limit,
    });
    return items;
  }

  async findAndUpdateOne(
    _id: string,
    updateDto: UpdateItemDto,
  ): Promise<ItemDocument | null> {
    const item = await this.itemsModel.findByIdAndUpdate(_id, updateDto, {
      new: true,
    });
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }
    return item;
  }
}
