import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SMPost } from 'src/posts/smPost.schema';
import { User } from 'src/users/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ auto: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SmPost' })
  smPost: SMPost;
  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
