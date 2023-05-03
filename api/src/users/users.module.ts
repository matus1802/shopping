import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersDbModule } from '../db/users/users.module';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { ItemsDbModule } from '../db/items/items.module';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [ItemsDbModule, UsersDbModule, PassportModule, ItemsModule],
  providers: [HttpStrategy, UsersResolver, UsersService],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
