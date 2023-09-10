import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JourneyDocument = Journey & Document;

@Schema()
export class Journey {
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  userName: string;
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
