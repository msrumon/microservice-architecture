import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Service2Document = Service2 & Document;

@Schema()
export class Service2 {
  @Prop()
  field2: string;
}

export const Service2Schema = SchemaFactory.createForClass(Service2);
