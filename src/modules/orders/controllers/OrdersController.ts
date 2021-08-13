import { Request, Response } from 'express';

import { ISaveIntegrationDTO } from './../dtos/ISaveIntegrationDTO';

import { SendDealToBlingService } from './../services/SendDealToBlingService';
import { ConvertDealsToXmlService } from '../services/ConvertDealsToXmlService';
import { PipedriveDealsService } from '../services/PipedriveDealsService';
import { SaveIntegrationMongoService } from '../services/SaveIntegrationMongoService';

export class OrdersController {
  constructor(
    private pipedriveDailyDeals: PipedriveDealsService,
    private convertDealsToXml: ConvertDealsToXmlService,
    private sendDealToBling: SendDealToBlingService,
    private saveIntegration: SaveIntegrationMongoService,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { year, month, day } = request.params;

      const date = [year, month, day].join('-');
      const wonDeals = await this.pipedriveDailyDeals.execute(date);

      const xmls = this.convertDealsToXml.execute(wonDeals.data[0].deals);
      await this.sendDealToBling.execute(xmls);

      const integrationDTO: ISaveIntegrationDTO = {
        wonDeals,
        date,
      };

      const mongoResult = await this.saveIntegration.execute(integrationDTO);

      return response.status(201).json(mongoResult);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
