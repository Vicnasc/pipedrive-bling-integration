import { CreateBlingDealRequestService } from './CreateBlingDealRequestService';
import { CreateBlingXMLService } from '../services/CreateBlingXMLService';

export class AgregateDailyDealsService {
  private createBlingRequests: CreateBlingDealRequestService;

  constructor() {
    this.createBlingRequests = new CreateBlingDealRequestService();
  }

  async execute(deals) {
    deals.forEach(async (deal: any) => {
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

      const xml = new CreateBlingXMLService(objData);
      await this.createBlingRequests.execute(xml.pedido);

      // const ordersRepository = new OrdersRepository();
      // const fetchBalance = ordersRepository.createDeals();
    });
  }
}
