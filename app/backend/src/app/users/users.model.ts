import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  @Prop()
  sku: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  cpf: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
