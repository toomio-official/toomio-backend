import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ auto: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop()
  userEmail: string;
  @Prop()
  userName: string;
  @Prop()
  avatarLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
