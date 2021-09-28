import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service1, Service1Document } from './schemas/service1.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service1.name)
    private readonly service1Model: Model<Service1Document>,
  ) {}

  async fetchData(): Promise<Service1[]> {
    return await this.service1Model.find().exec();
  }

  async storeData(data: object): Promise<Service1> {
    const service1 = new this.service1Model(data);
    return await service1.save();
  }

  async fetchDatum(id: string): Promise<Service1> {
    return await this.service1Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service1> {
    return await this.service1Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteDatum(id: string): Promise<Service1> {
    return await this.service1Model.findByIdAndRemove(id).exec();
  }
}
