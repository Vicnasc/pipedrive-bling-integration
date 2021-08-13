import { ICreateDailyOrderDTO } from '../dtos/ICreateOrderDTO';

export interface IMongoOrdersRepository {
  createDailyDeals(dailyOrders: ICreateDailyOrderDTO): void;
  findDailyDeals({ date }: { date: string }): {};
}
