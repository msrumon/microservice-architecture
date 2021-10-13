import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Service3Document = Service3 & Document;

@Schema()
export class Service3 {
  @Prop()
  field3: string;
}

export const Service3Schema = SchemaFactory.createForClass(Service3);
