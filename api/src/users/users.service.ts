import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsService } from '../items/items.service';

import { UsersDao } from '../db/users/users.dao';
import { SignupInput } from '../dto/signup.input';
import { User } from '../db/users/user.schema';
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly usersDao: UsersDao,
  ) {}

  async signup(dto: SignupInput): Promise<User | null> {
    const { username, password: _password, nickname } = dto;
    const password = await this.hashPass(_password);
    return this.usersDao.create({ username, password, nickname });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersDao.findByUsername(username);
  }

  async findById(_id: string): Promise<User | null> {
    return this.usersDao.findOne(_id);
  }

  async hashPass(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return { username, _id: user._id };
    }
    return null;
  }

  async resetCart(_id: string) {
    const user = await this.findById(_id);
    if (!user) {
      throw new NotFoundException(`Item not found`);
    }
    const updatedItems = await Promise.all(
      user.itemsInCart.map(async ({ _id }) => {
        return this.itemsService.resetInStock(_id);
      }),
    );
    const updatedUser = await this.usersDao.findAndUpdateOne(_id, {
      itemsInCart: [],
    });
    return {
      user: updatedUser,
      items: updatedItems,
    };
  }

  async addToCart(_id: string, itemId) {
    const user = await this.usersDao.findOne(_id);
    const item = await this.itemsService.decreaseInStock(itemId);
    user.itemsInCart = [...user.itemsInCart, itemId];
    await user.save();
    return { user, item };
  }

  async removeFromCart(_id: string, itemId) {
    const user = await this.usersDao.findOne(_id);
    const item = await this.itemsService.increaseInStock(itemId);
    const idx = user.itemsInCart.findIndex((i) => i.equals(itemId));
    if (idx > -1) {
      user.itemsInCart.splice(idx, 1);
      await user.save();
    }
    return { user, item };
  }

  async itemsInCart(_id) {
    const user = await this.usersDao.findOne(_id);
    return (await user.populate('itemsInCart')).itemsInCart;
  }
}
