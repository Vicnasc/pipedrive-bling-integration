type deals = {
  date: string;
  dailyAmount: number;
  deals: any[];
};

export class SaveIntegrationMongoService {
  execute({ wonDeals, date }) {
    const deals = wonDeals.data[0].deals.reduce(
      (acc: deals, cur) => {
        acc.dailyAmount += cur.value;
        acc.deals.push(cur);
      },
      {
        date,
        dailyAmount: 0,
        deals: [],
      },
    );

    return deals;
  }
}
