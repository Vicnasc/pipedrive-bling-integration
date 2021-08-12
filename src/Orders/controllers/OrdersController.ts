import { AgregateDailyDealsService } from './../services/AgregateDailyDealsService';
import { CreateBlingDealRequestService } from './../services/CreateBlingDealRequestService';
import { Request, Response } from 'express';

import { ShowPipedriveWonDealsService } from '../services/ShowPipedriveWonDealsService';

export class OrdersController {
  private dailyDeals: ShowPipedriveWonDealsService;
  private agregateDailyDealsService: AgregateDailyDealsService;

  constructor() {
    this.dailyDeals = new ShowPipedriveWonDealsService();
    this.agregateDailyDealsService = new AgregateDailyDealsService();
  }

  async handle(request: Request, response: Response) {
    try {
      const { year, month, day } = request.params;

      const date = [year, month, day].join('-');
      const deals = await this.dailyDeals.execute();

      await this.agregateDailyDealsService.execute(deals.data);

      return response.status(201).json(deals);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
