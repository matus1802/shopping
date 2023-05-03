import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type ItemDocument = HydratedDocument<Item>;

export enum Category {
  Vegetable = 'vegetable',
  Fruit = 'fruit',
  Cheese = 'cheese',
}

@ObjectType()
@Schema()
export class Item {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Factory((faker) => faker.name.firstName())
  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Factory((faker) => faker.lorem.paragraph())
  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Factory((faker) => faker.finance.amount())
  @Field(() => Number)
  @Prop({ required: true })
  price: number;

  @Factory(() => 2)
  @Field(() => Number)
  @Prop({ required: true })
  inStock: number;

  @Factory(() => {
    const i = Math.random();
    if (i < 0.3) {
      return Category.Vegetable;
    } else if (i < 0.6) {
      return Category.Fruit;
    } else return Category.Cheese;
  })
  @Field(() => String)
  @Prop({ required: true, type: String, enum: Category })
  category: Category;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
