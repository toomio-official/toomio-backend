import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
