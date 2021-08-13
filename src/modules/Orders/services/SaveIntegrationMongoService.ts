import { MongoOrdersRepository } from '../repositories/MongoOrdersRepository';

type deals = {
  date: string;
  dailyAmount: number;
  deals: any[];
};

export class SaveIntegrationMongoService {
  constructor(private mongoRepository: MongoOrdersRepository) {}

  async execute({ wonDeals, date }) {
    try {
      const findIfDateAlreadyExists = await this.mongoRepository.findDailyDeals(
        { date },
      );

      if (findIfDateAlreadyExists) return findIfDateAlreadyExists;

      const deals = wonDeals.data[0].deals.reduce(
        (acc: deals, cur) => {
          acc.dailyAmount += cur.value;
          acc.deals.push(cur);

          return acc;
        },
        {
          date,
          dailyAmount: 0,
          deals: [],
        },
      );

      await this.mongoRepository.createDailyDeals(deals);

      return await this.mongoRepository.findDailyDeals({ date });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
