import { DefSexo } from './def-sexo';
import { Endereco } from './endereco';
import { DefEstadoCivil } from './def-estado-civil';
import { DefTipoPessoa } from './def-tipo-pessoa';

export class Pessoa {
  Id: number;
  Nome: string;
  Cpf: string;
  Cnpj: string;
  Rg: string;
  SiglaSexo: string;
  Sexo: DefSexo;
  Pais: string;
  Telefone: string;
  Celular: string;
  Email: string;
  EmailHash: string;
  Enderecos: Endereco[];
  SiglaEstadoCivil: string;
  EstadoCivil: DefEstadoCivil;
  DataNascimento: Date;
  Profissao: string;
  Facebook: string;
  Instagram: string;
  Desconto: number;
  Obs: string;
  TipoPessoa: string;
  Tipo: DefTipoPessoa;
  Inativo: number;
  DataCadastro: Date;
}
