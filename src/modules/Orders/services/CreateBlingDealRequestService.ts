import https from 'https';

export class CreateBlingDealRequestService {
  async execute(xml: string) {
    const options = {
      host: `bling.com.br`,
      port: 443,
      path: `/Api/v2/pedido/json?apikey=${process.env.BLING_API_TOKEN}&xml=${xml}`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        charset: 'utf-8',
      },
    };

    const blingReq = https.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('error', error => {
        throw new Error(error.message);
      });

      res.on('end', () => {
        const answer = JSON.parse(data);

        if (Object.keys(answer.retorno).includes('erros'))
          throw new Error(answer.retorno.erros[0].erro.msg);
      });
    });

    blingReq.end();
  }
}
