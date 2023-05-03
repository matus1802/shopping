import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Item } from '../items/item.schema';

@Injectable()
export class ItemsSeeder implements Seeder {
  constructor(@InjectModel(Item.name) private readonly item: Model<Item>) {}

  async seed(): Promise<any> {
    const _items = await this.item.find({});
    if (_items.length) {
      console.log('No seed needed');
      return;
    }
    const items = DataFactory.createForClass(Item).generate(50);
    return this.item.insertMany(items);
  }

  async drop(): Promise<any> {}
}
