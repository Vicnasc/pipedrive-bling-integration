import { Router } from 'express';

import { OrdersController } from './../../Orders/controllers/OrdersController';

export const apiRoutes = Router();

const ordersController = new OrdersController();

apiRoutes.get('/deals/:year/:month/:day', (request, response) =>
  ordersController.handle(request, response),
);
