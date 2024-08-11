import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  _id: mongoose.Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ required: true })
  notificationString: string;
  @Prop({ required: true })
  userEmail: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
