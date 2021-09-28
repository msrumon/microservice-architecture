import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Service1Document = Service1 & Document;

@Schema()
export class Service1 {
  @Prop()
  field1: string;
}

export const Service1Schema = SchemaFactory.createForClass(Service1);
