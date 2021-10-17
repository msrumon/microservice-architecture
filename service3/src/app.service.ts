import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service3, Service3Document } from './schemas/service3.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service3.name)
    private readonly service3Model: Model<Service3Document>,
  ) {}

  async fetchData(): Promise<Service3[]> {
    return await this.service3Model.find().exec();
  }

  async storeData(data: object): Promise<Service3> {
    const service3 = new this.service3Model(data);
    return await service3.save();
  }

  async fetchDatum(id: string): Promise<Service3> {
    return await this.service3Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service3> {
    return await this.service3Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteDatum(id: string): Promise<Service3> {
    return await this.service3Model.findByIdAndDelete(id).exec();
  }
}
