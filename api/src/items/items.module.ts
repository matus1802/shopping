import { Module } from '@nestjs/common';
import { ItemsResolver } from './items.resolver';
import { ItemsDbModule } from '../db/items/items.module';
import { ItemsService } from './items.service';

@Module({
  imports: [ItemsDbModule],
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
