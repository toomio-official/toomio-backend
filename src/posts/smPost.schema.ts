import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Journey } from 'src/journeys/journey.schema';
import { Like } from 'src/likes/like.schema';

export type SMPostDocument = SMPost & Document;

@Schema()
export class SMPost {
  _id: mongoose.Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop({ type: [String] })
  imageUrls: string[];
  @Prop()
  userEmail: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
  likes: Like[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Journey' })
  journey: Journey;
}

export const SMPostSchema = SchemaFactory.createForClass(SMPost);
