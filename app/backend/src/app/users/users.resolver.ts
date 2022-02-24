import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { User } from './users.model';
import { UsersService } from './users.service';

import { ListUsers, CreateUser } from './users.inputs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  async users(@Args('filters', { nullable: true }) filters?: ListUsers) {
    return await this.userService.list(filters);
  }

  @Mutation(() => User)
  async createUser(@Args('user') user?: CreateUser) {
    return await this.userService.create(user);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('sku', { type: () => String }) sku: Types.ObjectId) {
    return this.userService.delete(sku);
  }
}
