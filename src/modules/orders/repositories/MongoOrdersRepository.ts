import { MongoClient } from 'mongodb';

import { IMongoOrdersRepository } from './IMongoOrdersRepository';
import { ICreateDailyOrderDTO } from '../dtos/ICreateOrderDTO';

export class MongoOrdersRepository implements IMongoOrdersRepository {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(`${process.env.DB_HOST}`);
  }

  async createDailyDeals(dailyOrders: ICreateDailyOrderDTO) {
    try {
      await this.client.connect();

      const collection = this.client
        .db(`${process.env.DB_NAME}`)
        .collection(`deals`);

      const newDailyDeal = await collection.insertOne(dailyOrders);

      return newDailyDeal.acknowledged;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      await this.client.close();
    }
  }

  async findDailyDeals({ date }: { date: string }) {
    try {
      await this.client.connect();

      const collection = this.client
        .db(`${process.env.DB_NAME}`)
        .collection(`deals`);

      return await collection.findOne({ date });
    } catch (err) {
      throw new Error(err.message);
    } finally {
      await this.client.close();
    }
  }
}
