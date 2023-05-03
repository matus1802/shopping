import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UsersDao {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create({
    username,
    password,
    nickname,
  }: {
    username: string;
    password: string;
    nickname: string;
  }): Promise<User | null> {
    return this.userModel.create({
      username,
      password,
      nickname,
      itemsInCart: [],
    });
  }

  async findOne(_id: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id });
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }

  async findAndUpdateOne(
    _id: string,
    updateDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndUpdate(_id, updateDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
}
