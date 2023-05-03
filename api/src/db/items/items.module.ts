import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, Item } from './item.schema';
import { ItemsDao } from './items.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemsDao],
  exports: [ItemsDao],
})
export class ItemsDbModule {}
