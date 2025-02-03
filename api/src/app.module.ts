import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath } from './config/environments';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [getEnvFilePath()],
      load: [mongoConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongo.url'),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, connection }) => {
        return connection ? { req: connection.context } : { req };
      },
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
    }),
    DbModule,
    UsersModule,
    ItemsModule,
  ],
})
export class AppModule {}
