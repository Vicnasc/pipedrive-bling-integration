import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';

export class CreateBlingXMLService {
  public pedido: string;

  constructor(dataToConvert: ICreateOrderDTO) {
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
