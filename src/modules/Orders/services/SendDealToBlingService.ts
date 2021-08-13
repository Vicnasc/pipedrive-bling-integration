import axios from 'axios';

import { BlingXML } from '../../../shared/models/BlingXML';

export class SendDealToBlingService {
  async execute(xmls: BlingXML[]) {
    try {
      const promises = xmls.map(async xml => {
        try {
          const bling = await axios.post(
            `https://bling.com.br/Api/v2/pedido/json`,
            {},
            {
              params: {
                apikey: process.env.BLING_API_TOKEN,
                xml: xml.pedido,
              },
            },
          );

          return bling.data.retorno;
        } catch (err) {
          throw new Error(err);
        }
      });

      return await Promise.all(promises);
    } catch (err) {
      throw new Error(err);
    }
  }
}
