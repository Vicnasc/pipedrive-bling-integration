import { MongoClient } from 'mongodb';

import { ICreateOrderDTO } from './../dtos/ICreateOrderDTO';

export class OrdersRepository {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(`${process.env.DB_HOST}`);
  }

  async createDeals(order: ICreateOrderDTO) {
    try {
      await this.client.connect();

      const collection = this.client
        .db(`${process.env.DB_NAME}`)
        .collection(`deals`);

      const checkIfExists = await collection.findOne(order);
      if (checkIfExists) throw new Error('Deal already saved');

      await collection.insertOne(order);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      await this.client.close();
    }
  }
}
