import { BlingXML } from '../../../shared/models/BlingXML';

export class ConvertDealsToXmlService {
  execute(deals: any) {
    return deals.map((deal: any) => {
      const objData = {
        pedido: {
          cliente: {
            nome: deal.person_name.split(' ').join(''),
          },
          volume: {
            servico: 'null',
          },
          item: {
            descricao: deal.title.split(' ').join(''),
            qtde: deal.products_count,
            vlr_unit: deal.weighted_value,
            codigo: '1',
          },
          parcela: {
            vlr: deal.weighted_value,
          },
        },
      };

      return new BlingXML(objData);
    });
  }
}
