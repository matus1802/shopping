import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Item, ItemDocument } from '../items/item.schema';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  username: string;

  @Field(() => String)
  @Prop({ required: true })
  password: string;

  @Field(() => String)
  @Prop({ required: true })
  nickname: string;

  @Field(() => [Item])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Item' }] })
  itemsInCart: ItemDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
