import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SMPost } from 'src/posts/smPost.schema';
import { User } from 'src/users/user.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ auto: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SmPost' })
  smPost: SMPost;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
