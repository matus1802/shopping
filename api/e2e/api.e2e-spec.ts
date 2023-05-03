import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../src/db/items/item.schema';
import { ItemsSeeder } from '../src/db/items/items.seeder';
import signupMutation from './signup.mutation';
import loginMutation from './login.mutation';
import meQuery from './me.query';
import itemsQuery from './items.query';
import addItemToCartMutation from './addItemToCart.mutation';

const validHeaders = {
  'content-type': 'application/json',
};

describe('Shopping', () => {
  let app: INestApplication;
  let module: TestingModule;
  let mongodb: StartedTestContainer;

  beforeAll(async () => {
    mongodb = await new GenericContainer('mongo:6')
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: 'username',
        MONGO_INITDB_ROOT_PASSWORD: 'password',
      })
      .start();

    const mongoUri = `mongodb://username:password@${mongodb.getHost()}:${mongodb.getFirstMappedPort()}`;

    seeder({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
      ],
    }).run([ItemsSeeder]);

    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('CONFIGURATION(mongo)')
      .useFactory({
        factory: () => ({
          url: mongoUri,
        }),
      })
      .compile();

    app = await module.createNestApplication().init();
  }, 60000);

  afterAll(async () => {
    await mongodb.stop();
    await app.close();
  });

  describe('GQL', () => {
    it('Should signup user', async () => {
      const mutation = signupMutation();
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set(validHeaders)
        .send(mutation);
      expect(response.body.data.signup).toBeTruthy();
    });

    it('Should login user', async () => {
      const mutation = loginMutation();
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set(validHeaders)
        .send(mutation);
      expect(response.ok).toBeTruthy();
      expect(response.body.data.login).toBeTruthy();
    });

    it('Should not get me when no token in header', async () => {
      const query = meQuery();
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set(validHeaders)
        .send(query);
      expect(response.ok).toBeTruthy();
      expect(response.body.errors).toBeDefined();
    });

    it('Should get me when token in header', async () => {
      const query = meQuery();
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set({ ...validHeaders, authorization: `Basic ${btoa('a:a')}` })
        .send(query);
      expect(response.body.data.me).toBeDefined();
    });

    it('Should get available items', async () => {
      const query = itemsQuery({ category: 'vegetable', limit: 5, offset: 0 });
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set({ ...validHeaders, authorization: `Basic ${btoa('a:a')}` })
        .send(query);
      expect(response.body.data.items).toBeDefined();
    });

    it('Should get available items', async () => {
      const query = itemsQuery({ category: 'vegetable', limit: 5, offset: 0 });
      const response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set({ ...validHeaders, authorization: `Basic ${btoa('a:a')}` })
        .send(query);
      expect(response.body.data.items).toBeDefined();
    });

    it('Should be able to add to cart', async () => {
      let query = itemsQuery({ category: 'vegetable', limit: 5, offset: 0 });
      let response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set({ ...validHeaders, authorization: `Basic ${btoa('a:a')}` })
        .send(query);
      expect(response.body.data.items).toBeDefined();

      query = addItemToCartMutation({
        itemId: response.body.data.items[0]._id,
      });
      response = await supertest(app.getHttpServer())
        .post('/graphql')
        .set({ ...validHeaders, authorization: `Basic ${btoa('a:a')}` })
        .send(query);
      expect(response.body.data.addToCart.user.itemsInCart.length).toBe(1);
    });
  });
});
