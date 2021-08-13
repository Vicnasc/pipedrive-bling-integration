import { ICreateDailyOrderDTO } from '../../modules/orders/dtos/ICreateOrderDTO';

export class BlingXML {
  public pedido: string;

  constructor(dataToConvert: ICreateDailyOrderDTO) {
    let result = '';

    Object.entries(dataToConvert.pedido).forEach(([group, values]) => {
      result += `<${group}>`;

      Object.entries(values).forEach(([field, value]) => {
        result += `<${field}>${value}</${field}>`;
      });

      result += `</${group}>`;
    });

    this.pedido = `<pedido>${result}</pedido>`;
  }
}
