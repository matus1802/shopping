import { UpdateCartInput } from '../dto/updateCart.input';
import { LoginInput } from '../dto/login.input';
import { BuyResult } from '../dto/buy.result';
import { UpdateCartResult } from '../dto/updateCart.result';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '../db/users/user.schema';
import { SignupInput } from '../dto/signup.input';
import { UsersService } from './users.service';
import { HttpGQLAuthGuard } from './http-gql-auth.guard';
import { CurrentUser } from './user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Boolean)
  async signup(@Args('input') signupInput: SignupInput) {
    return Boolean(await this.usersService.signup(signupInput));
  }

  @Mutation(() => Boolean)
  async login(@Args('input') { username, password }: LoginInput) {
    return Boolean(await this.usersService.validateUser(username, password));
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(HttpGQLAuthGuard)
  async me(@CurrentUser() user: CurrentUser) {
    return this.usersService.findById(user._id);
  }

  @Mutation(() => BuyResult, { name: 'buy' })
  @UseGuards(HttpGQLAuthGuard)
  async buy(@CurrentUser() user: CurrentUser) {
    const updated = await this.usersService.resetCart(user._id);
    return updated;
  }

  @Mutation(() => UpdateCartResult)
  @UseGuards(HttpGQLAuthGuard)
  async removeFromCart(
    @CurrentUser() user: CurrentUser,
    @Args('input') { itemId }: UpdateCartInput,
  ) {
    return this.usersService.removeFromCart(user._id, itemId);
  }

  @Mutation(() => UpdateCartResult)
  @UseGuards(HttpGQLAuthGuard)
  async addToCart(
    @CurrentUser() user: CurrentUser,
    @Args('input') { itemId }: UpdateCartInput,
  ) {
    return this.usersService.addToCart(user._id, itemId);
  }

  @ResolveField()
  async itemsInCart(@Parent() user: User) {
    return this.usersService.itemsInCart(user._id);
  }
}
