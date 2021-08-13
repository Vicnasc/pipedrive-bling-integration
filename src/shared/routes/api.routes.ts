import { Router } from 'express';

import { OrdersController } from '../../modules/orders/controllers/OrdersController';

import { SendDealToBlingService } from './../../modules/orders/services/SendDealToBlingService';
import { ConvertDealsToXmlService } from './../../modules/orders/services/ConvertDealsToXmlService';
import { PipedriveDealsService } from '../../modules/orders/services/PipedriveDealsService';
import { SaveIntegrationMongoService } from '../../modules/orders/services/SaveIntegrationMongo';

export const apiRoutes = Router();

const pipedriveDailyDeals = new PipedriveDealsService();
const convertDealsToXml = new ConvertDealsToXmlService();
const sendDealToBling = new SendDealToBlingService();
const saveIntegration = new SaveIntegrationMongoService();

const ordersController = new OrdersController(
  pipedriveDailyDeals,
  convertDealsToXml,
  sendDealToBling,
  saveIntegration,
);

apiRoutes.get('/deals/:year/:month/:day', (request, response) =>
  ordersController.handle(request, response),
);
