import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JourneyDocument = Journey & Document;

@Schema()
export class Journey {
  @Prop()
  id: string;
  @Prop()
  name: string;
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
