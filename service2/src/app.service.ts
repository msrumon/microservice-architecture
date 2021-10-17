import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service2, Service2Document } from './schemas/service2.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Service2.name)
    private readonly service2Model: Model<Service2Document>,
    @Inject('SERVICE2') private readonly client: ClientProxy,
  ) {}

  async fetchData(): Promise<Service2[]> {
    return await this.service2Model.find().exec();
  }

  async storeData(data: object): Promise<Service2> {
    const service2 = new this.service2Model(data);
    await service2.save();
    this.client.emit('service1', { data });
    this.client.emit('service3', { data });
    return service2;
  }

  async fetchDatum(id: string): Promise<Service2> {
    return await this.service2Model.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Service2> {
    const service2 = await this.service2Model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    this.client.emit('service1', { id, data });
    this.client.emit('service3', { id, data });
    return service2;
  }

  async deleteDatum(id: string): Promise<Service2> {
    const service2 = await this.service2Model.findByIdAndDelete(id).exec();
    this.client.emit('service1', { id });
    this.client.emit('service3', { id });
    return service2;
  }
}
