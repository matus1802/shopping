import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsSeeder } from './db/items/items.seeder';
import { ItemSchema, Item } from './db/items/item.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath } from './config/environments';
import mongoConfig from './config/mongo.config';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [getEnvFilePath()],
      load: [mongoConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('mongo.url'),
        };
      },
    }),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
}).run([ItemsSeeder]);
