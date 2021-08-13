import axios from 'axios';

export class PipedriveDealsService {
  async execute(date: string) {
    try {
      const deals = await axios.get(
        `https://linkapi10.pipedrive.com/v1/deals/timeline`,
        {
          params: {
            api_token: process.env.PIPEDRIVE_API_TOKEN,
            start_date: date,
            interval: 'day',
            amount: '1',
            field_key: 'won_time',
          },
        },
      );

      return await deals.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
