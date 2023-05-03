import { Module } from '@nestjs/common';
import { UsersDbModule } from './users/users.module';
import { ItemsDbModule } from './items/items.module';

@Module({
  imports: [UsersDbModule, ItemsDbModule],
  exports: [UsersDbModule, ItemsDbModule],
})
export class DbModule {}
