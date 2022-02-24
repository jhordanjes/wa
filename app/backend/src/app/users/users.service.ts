import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'bson';
import { User, UserDocument } from './users.model';

import { ListUsers, CreateUser } from './users.inputs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  list(filters: ListUsers) {
    if (filters.cpf || filters.email || filters.name) {
      const result = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value),
      );

      return this.userModel.where({ ...result }).exec();
    }
    return this.userModel.find().exec();
  }

  create(user: CreateUser) {
    const model = new this.userModel(user);
    model.sku = model._id;
    return model.save();
  }

  delete(sku: Types.ObjectId) {
    if (this.userModel.findOneAndDelete({ sku: new ObjectId(sku) }).exec())
      return true;
    else return false;
  }
}
