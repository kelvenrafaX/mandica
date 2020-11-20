import { Time } from '@angular/common';
import { Cliente } from './cliente';
import { DefTipoEntrega } from './def-tipo-entrega';
import { OrcamentoProduto } from './orcamento-produto';
import { Entrega } from './entrega';
import { Bandeira } from './bandeira';
import { Natureza } from './natureza';
import { Venda } from './venda';

export class Orcamento {
    Id: number;
    Cliente: Cliente;
    ClienteId: number;
    TipoEntrega: DefTipoEntrega;
    TipoEntregaId: number;
    DataEntrega: Date;
    DataEntregue: Date;
    DataEvento: Date;
    Diarias: number;
    Entrega: Entrega;
    Obs: string;
    TipoPedido: string;
    OrcamentoProduto: OrcamentoProduto[];
    Venda: Venda[];
    Desconto: number;
    Frete: number;
    DataCadastro: Date;
    DataPedido: Date;
    DataDevolucao: Date;
    DataDevolvido: Date;
    ValorTotal: number;
    Status: string;
    DiasRestantes: number;
    PercentualEntrada: number;

    // Not Mapped
    HorarioEntrega: string;
    HorarioEntregue: string;
    HorarioEvento: string;
    HorarioDevolucao: string;

    constructor() { }

}
