import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { apiRoutes } from './shared/routes/api.routes';

config({
  path: '../.env',
});

const api = express();

api.use(cors());
api.use(express.json());

api.use(apiRoutes);

api.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port: ${process.env.SERVER_PORT}`),
);
