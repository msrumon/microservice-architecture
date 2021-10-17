import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service2, Service2Document } from './schemas/service2.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service2.name)
    private readonly service2Model: Model<Service2Document>,
  ) {}

  async fetchData(): Promise<Service2[]> {
    return await this.service2Model.find().exec();
  }

  async storeData(data: object): Promise<Service2> {
    const service2 = new this.service2Model(data);
    return await service2.save();
  }

  async fetchDatum(id: string): Promise<Service2> {
    return await this.service2Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service2> {
    return await this.service2Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteDatum(id: string): Promise<Service2> {
    return await this.service2Model.findByIdAndDelete(id).exec();
  }
}
