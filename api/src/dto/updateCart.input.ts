import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput {
  @Field()
  itemId: string;
}
