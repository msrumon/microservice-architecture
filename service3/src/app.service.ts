import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service3, Service3Document } from './schemas/service3.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service3.name)
    private readonly service3Model: Model<Service3Document>,
    @Inject('SERVICE3') private readonly client: ClientProxy,
  ) {}

  async fetchData(): Promise<Service3[]> {
    return await this.service3Model.find().exec();
  }

  async storeData(data: object): Promise<Service3> {
    const service3 = new this.service3Model(data);
    await service3.save();
    this.client.emit('service1', { data });
    this.client.emit('service2', { data });
    return service3;
  }

  async fetchDatum(id: string): Promise<Service3> {
    return await this.service3Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service3> {
    const service3 = await this.service3Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    this.client.emit('service1', { id, data });
    this.client.emit('service2', { id, data });
    return service3;
  }

  async deleteDatum(id: string): Promise<Service3> {
    const service3 = await this.service3Model.findByIdAndDelete(id).exec();
    this.client.emit('service1', { id });
    this.client.emit('service2', { id });
    return service3;
  }
}
