import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service1, Service1Document } from './schemas/service1.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service1.name)
    private readonly service1Model: Model<Service1Document>,
    @Inject('SERVICE1') private readonly client: ClientProxy,
  ) {}

  async fetchData(): Promise<Service1[]> {
    return await this.service1Model.find().exec();
  }

  async storeData(data: object): Promise<Service1> {
    const service1 = new this.service1Model(data);
    await service1.save();
    this.client.emit('service2', { data });
    this.client.emit('service3', { data });
    return service1;
  }

  async fetchDatum(id: string): Promise<Service1> {
    return await this.service1Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service1> {
    const service1 = await this.service1Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    this.client.emit('service2', { id, data });
    this.client.emit('service3', { id, data });
    return service1;
  }

  async deleteDatum(id: string): Promise<Service1> {
    const service1 = await this.service1Model.findByIdAndRemove(id).exec();
    this.client.emit('service2', { id });
    this.client.emit('service3', { id });
    return service1;
  }
}
