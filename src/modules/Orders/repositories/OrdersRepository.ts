import { MongoClient } from 'mongodb';

import { ICreateDailyOrderDTO } from '../dtos/ICreateOrderDTO';

export class OrdersRepository {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(`${process.env.DB_HOST}`);
  }

  async createDeals(dailyOrders: ICreateDailyOrderDTO) {
    try {
      await this.client.connect();

      const collection = this.client
        .db(`${process.env.DB_NAME}`)
        .collection(`deals`);

      return await collection.insertOne(dailyOrders);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      await this.client.close();
    }
  }

  async findDeal(date) {
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
