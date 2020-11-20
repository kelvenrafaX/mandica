import { Bandeira } from './bandeira';
import { Natureza } from './natureza';

export class Venda {
  Id: number;
  Grupo: number;
  Parcela: number;
  ValorParcela: number;
  ValorPago: number;
  DataPagamento: Date;
  DataRecebimento: Date;
  Bandeira: Bandeira;
  BandeiraId: number;
  Natureza: Natureza;
  NaturezaId: number;
  Plano: number;
  Recente: boolean;
}
