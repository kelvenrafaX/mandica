import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formGroupAcervo } from './form-group-acervo';
import { formGroupCliente } from './form-group-cliente';
import { formGroupCompra } from './form-group-compra';
import { formGroupFornecedor } from './form-group-fornecedor';
import { formGroupProduto } from './form-group-produtos';
import { formGroupServico } from './form-group-servico';

export class FormGroups {

    constructor () { }

    public formGroupAcervo() {
        return new FormGroup({
            Id: new FormControl('', []),
            Situacao: new FormControl('', []),
            Tipo: new FormControl('', []),
            Terceiros: new FormControl('', []),
            Categoria: new FormGroup({
                Descricao: new FormControl()
            }),
            CategoriaId: new FormControl('', [
                Validators.required
              ]),
            Fornecedor: new FormGroup({
                Pessoa: new FormGroup({
                    Nome: new FormControl()
                })
            }),
            FornecedorId: new FormControl('', [
                Validators.required
            ]),
            Nome: new FormControl('', [
                Validators.required
            ]),
            Descricao : new FormControl(''),
            ValorUnitarioLocacao: new FormControl('', [
                Validators.required
            ]),
            ValorUnitarioReposicao: new FormControl('', [
                Validators.required
            ]),
            ValorCustoProduto: new FormControl('', [
                Validators.required
            ]),
            ImagemProdutos: new FormControl('', [ ]),
            Cor: new FormControl('', [ ]),
            Altura: new FormControl('', [ ]),
            Profundidade: new FormControl('', [ ]),
            Largura: new FormControl('', [ ])
        });
    }

    public formGroupCliente() {
        return new FormGroup({
            Id: new FormControl(),
            Pessoa: new FormGroup({
              Id: new FormControl('', []),
              Nome: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
              ]),
              RazaoSocial: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
              ]),
              Cpf: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
              ]),
              Cnpj: new FormControl('', [
                Validators.required,
                Validators.minLength(11)
              ]),
              NomeContato: new FormControl('', [ ]),
              Rg: new FormControl('', []),
              SiglaSexo: new FormControl('', [
                Validators.required
              ]),
              Telefone: new FormControl('', [ ]),
              Celular: new FormControl('', [
                Validators.required,
                Validators.minLength(11)
              ]),
              Celular2: new FormControl('', []),
              Email: new FormControl('', [
                Validators.pattern('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$')
              ]),
              Enderecos: new FormGroup({
                Cep: new FormControl('', []),
                Rua: new FormControl('', []),
                Bairro: new FormControl('', []),
                Complemento: new FormControl(''),
                Cidade: new FormControl('', []),
                Estado: new FormControl('', []),
                Numero: new FormControl('', []),
              }),
              DataNascimento: new FormControl('', []),
              Desconto: new FormControl('0,00'),
              Obs: new FormControl('', [ ]),
              TipoPessoa: new FormControl('', [
                Validators.required,
              ]),
              Tipo: new FormControl(''),
            })
          });
    }

    public formGroupCompra() {
        return new FormGroup({
            Id: new FormControl('', []),
            NumDocumento: new FormControl('', []),
            ProdutoId: new FormControl('', [
              Validators.required
            ]),
            Quantidade: new FormControl('', [
              Validators.required,
              Validators.minLength(1)
            ]),
            DataCompra: new FormControl('', [
              Validators.required,
              Validators.pattern('[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]')
            ]),
            FornecedorId: new FormControl('', [ ])
          });
    }

    public formGroupFornecedor() {
        return new FormGroup({
            Id: new FormControl(),
            Pessoa: new FormGroup({
              Id: new FormControl('', []),
              Nome: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
              ]),
              RazaoSocial: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
              ]),
              Cpf: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
              ]),
              Cnpj: new FormControl('', [
                Validators.required,
                Validators.minLength(11)
              ]),
              NomeContato: new FormControl('', [ ]),
              Rg: new FormControl('', []),
              SiglaSexo: new FormControl('', [
                Validators.required
              ]),
              Telefone: new FormControl('', [ ]),
              Celular: new FormControl('', [
                Validators.required,
                Validators.minLength(11)
              ]),
              Celular2: new FormControl('', []),
              Email: new FormControl('', [
                Validators.pattern('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$')
              ]),
              Enderecos: new FormGroup({
                Cep: new FormControl('', []),
                Rua: new FormControl('', []),
                Bairro: new FormControl('', []),
                Complemento: new FormControl(''),
                Cidade: new FormControl('', []),
                Estado: new FormControl('', []),
                Numero: new FormControl('', []),
              }),
              DataNascimento: new FormControl('', []),
              Desconto: new FormControl(''),
              Obs: new FormControl('', [ ]),
              TipoPessoa: new FormControl('', [
                Validators.required,
              ]),
              Tipo: new FormControl(''),
            })
          });
    }
     public formGroupFuncionario() {
       return new FormGroup({
      Id: new FormControl(),
      CargoId: new FormControl(),
      Pessoa: new FormGroup({
        Id: new FormControl('', []),
        Nome: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        RazaoSocial: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        Cpf: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        Cnpj: new FormControl('', [
          Validators.required,
          Validators.minLength(11)
        ]),
        NomeContato: new FormControl('', [ ]),
        Rg: new FormControl('', []),
        SiglaSexo: new FormControl('', [
          Validators.required
        ]),
        Telefone: new FormControl('', [ ]),
        Celular: new FormControl('', [
          Validators.required,
          Validators.minLength(11)
        ]),
        Celular2: new FormControl('', []),
        Email: new FormControl('', [
          Validators.pattern('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$')
        ]),
        Enderecos: new FormGroup({
          Cep: new FormControl('', []),
          Rua: new FormControl('', []),
          Bairro: new FormControl('', []),
          Complemento: new FormControl(''),
          Cidade: new FormControl('', []),
          Estado: new FormControl('', []),
          Numero: new FormControl('', []),
        }),
        DataNascimento: new FormControl('', []),
        Desconto: new FormControl(''),
        Obs: new FormControl('', [ ]),
        TipoPessoa: new FormControl('', [
          Validators.required,
        ]),
        Tipo: new FormControl(''),
      })
     });
    }

    public formGroupProduto() {
        return new FormGroup({
            Id: new FormControl('', []),
            Situacao: new FormControl('', []),
            Tipo: new FormControl('', []),
            Estocado: new FormControl('', []),
            CategoriaId: new FormControl('', [
                Validators.required
              ]),
            FornecedorId: new FormControl('', [
                Validators.required
            ]),
            Nome: new FormControl('', [
                Validators.required
            ]),
            Descricao : new FormControl(''),
            ValorUnitarioLocacao: new FormControl('', [
                Validators.required
            ]),
            ValorCustoProduto: new FormControl('', [
                Validators.required
            ]),
            ImagemProdutos: new FormControl('', [ ]),
            EstoqueMin: new FormControl('', [ ]),
            EstoqueMax: new FormControl('', [ ]),
            Cor: new FormControl('', [ ]),
            Altura: new FormControl('', [ ]),
            Profundidade: new FormControl('', [ ]),
            Largura: new FormControl('', [ ])
        });
    }

    public formGroupServico() {
        return  new FormGroup({
            Id: new FormControl('', []),
            Situacao: new FormControl('', []),
            Tipo: new FormControl('', []),
            Estocado: new FormControl('', []),
            CategoriaId: new FormControl('', [
                Validators.required
              ]),
            FornecedorId: new FormControl('', []),
            Nome: new FormControl('', [
                Validators.required
            ]),
            Descricao : new FormControl(''),
            ValorUnitarioLocacao: new FormControl('', [
                Validators.required
            ]),
            ValorUnitarioReposicao: new FormControl('', []),
            ValorCustoProduto: new FormControl('', []),
            ImagemProdutos: new FormControl('', [ ])
        });
    }
}
