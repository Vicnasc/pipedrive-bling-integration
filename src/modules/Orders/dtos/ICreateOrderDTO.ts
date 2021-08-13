export interface ICreateDailyOrderDTO {
  pedido: {
    cliente: {
      nome: string;
    };
    volume: {
      servico: string;
    };
    item: {
      descricao: string;
      qtde: number;
      vlr_unit: number;
      codigo: string;
    };
    parcela: {
      vlr: number;
    };
  };
}
