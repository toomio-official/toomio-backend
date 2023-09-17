import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Journey } from 'src/journeys/journey.schema';

export type SMPostDocument = SMPost & Document;

@Schema()
export class SMPost {
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  userEmail: string;
  @Prop()
  likedUserEmails: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Journey' })
  journey: Journey;
}

export const SMPostSchema = SchemaFactory.createForClass(SMPost);
