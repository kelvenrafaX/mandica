import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../providers/funcionario.service';
import { formGroupFuncionario } from '../add-funcionario/form-group-funcionario';
import { CepService } from '../../../providers/cep.service';
import { Funcionario } from '../../../entity/funcionario';
import { FiltroCliente } from '../../../models/filtros/filtroCliente';
import { JsonResponse } from '../../../models/JsonResponse';
import { Mask } from '../../../models/mask';
import { SerializeForm } from '../../../models/form/serialize';
import { Cep } from '../../../models/cep';
import { FiltroFuncionario } from '../../../models/filtros/filtroFuncionario';

@Component({
selector: './app-list-funcionarios',
templateUrl: './list-funcionarios.component.html',
providers: [ FuncionarioService, CepService ],
styleUrls: ['./list-funcionarios.component.scss']
})
export class ListFuncionariosComponent implements OnInit {

    @Input() funcionarios: Funcionario[];
    @Output() filtrando = new EventEmitter();
    @Output() eventEdit = new EventEmitter();
    @Output() eventRemove = new EventEmitter();
    @Output() eventControleAcesso   =  new EventEmitter();
    @Input() controleAcesso:boolean;

    funcionarioEdit: Funcionario;
    typeTable: string;
    filtro: FiltroFuncionario;
    loadingClientes = true;

    tipoPessoa: string;
    form = formGroupFuncionario;
    cpfCnpjExists: JsonResponse;
      /** Mask's */
    mask: Mask = new Mask();

    constructor(private funcionarioService: FuncionarioService, private cepService: CepService) { }

    ngOnInit(): void {
      console.log('merda');
        this.funcionarios = [];
        this.searchFuncionario();

        this.funcionarioEdit = new Funcionario();
        this.filtro = new FiltroCliente();
        this.typeTable = 'grid';
        this.filtro.Inativo = 2;
        this.setFormDefault();
        this.cpfCnpjExists = new JsonResponse();
    }

    filter(): void {
      this.filtrando.emit(this.filtro);
    }

    remove(funcionario: Funcionario) {
      this.funcionarioService.inativar(funcionario.Id, 1)
        .subscribe( message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
            this.eventRemove.emit(funcionario);
        });
    }

    searchFuncionario(): void {
      this.loadingClientes = true;
      const buscandoFuncinario = setInterval( () => {
        if (this.funcionarios.length > 0) {
          this.loadingClientes = false;
          clearInterval(buscandoFuncinario);
        }
      }, 100 );
    }

    changeTable(value: string) {
        this.typeTable = value;
    }

    openModal(classicModal: any, funcionario: Funcionario) {
      this.funcionarioEdit = funcionario;
      this.form.patchValue( funcionario );
      this.form.patchValue( SerializeForm.serializePessoaEnderecoEdit(funcionario.Pessoa) );
      classicModal.show();
    }

    inativarFuncionario(funcionario: Funcionario) {
        const status = funcionario.Pessoa.Inativo === 0 ? 1 : 0;
        this.funcionarioService.inativar(funcionario.Id, status)
        .subscribe( message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
            // this.search();
        });
    }

    setBuscaInativos(status: number) {
        this.filtro.Inativo = status;
        // this.search();
    }

    deleteFuncionario(funcionario: Funcionario): void {
        this.funcionarioService.deleteFuncionario(funcionario.Id)
            .subscribe(message => {
                console.log(message);
                // this.getClientes();
            });
    }

    setFormDefault(): void {
      this.tipoPessoa = 'pf';
      this.form.patchValue(SerializeForm.serializeFormDefault());
    }

    popularCamposCep(endereco: Cep) {
      this.form.patchValue({
        Pessoa: {
          Enderecos: {
            Estado: endereco.uf,
            Cidade : endereco.localidade,
            Rua: endereco.logradouro,
            Bairro: endereco.bairro,
            Complemento: endereco.complemento
          }
        }
      });
    }

    clearForm(): void {
      this.setFormDefault();
      Swal.fire('Limpo!', 'Formulário limpo com sucesso!', 'success');
    }

    validCpfCnpj() {
      let cnpjCpf = this.form.controls.Pessoa.get('CpfCnpj').value;
      if (cnpjCpf !=  null && typeof cnpjCpf === 'string') {
        cnpjCpf = cnpjCpf.substring(0, cnpjCpf.length).replace(/[^\d\s]/gi, '');
      }
      if (cnpjCpf.length === 11 || cnpjCpf.length === 14) {
        this.funcionarioService.existisCpfCnpj(cnpjCpf)
        .subscribe( x => {
          this.cpfCnpjExists = x;
        });
      } else {
        this.cpfCnpjExists = {Type: 'success', Title: '', Message: '', Entity: {}};
      }
    }

    carregarEndereco(): void {
      const cep: any = this.form.controls.Pessoa.get('Enderecos').get('Cep').value;
      this.cepService.getEndereco(cep)
        .subscribe((data: Cep) => {
            this.popularCamposCep(data);
        });
    }

    onSubmit() {
      const funcionario = SerializeForm.serializePessoa<Funcionario>(this.funcionarioEdit.Id, this.form);
      this.funcionarioService.updateFuncionario(funcionario)
      .subscribe(message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, 'success');
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }
        // this.getClientes();
      });
    }

  get Nome() { return this.form.controls.Pessoa.get('Nome'); }
  get CpfCnpj() { return this.form.controls.Pessoa.get('CpfCnpj'); }
  get Rg() { return this.form.controls.Pessoa.get('Rg'); }
  get SiglaSexo() { return this.form.controls.Pessoa.get('SiglaSexo'); }
  get Pais() { return this.form.controls.Pessoa.get('Pais'); }
  get Telefone() { return this.form.controls.Pessoa.get('Telefone'); }
  get Celular() { return this.form.controls.Pessoa.get('Celular'); }
  get Email() { return this.form.controls.Pessoa.get('Email'); }
  get Cep() { return this.form.controls.Pessoa.get('Enderecos').get('Cep'); }
  get Estado() { return this.form.controls.Pessoa.get('Enderecos').get('Estado'); }
  get Rua() { return this.form.controls.Pessoa.get('Enderecos').get('Rua'); }
  get Bairro() { return this.form.controls.Pessoa.get('Enderecos').get('Bairro'); }
  get Cidade() { return this.form.controls.Pessoa.get('Enderecos').get('Cidade'); }
  get Complemento() { return this.form.controls.Pessoa.get('Enderecos').get('Complemento'); }
  get Numero() { return this.form.controls.Pessoa.get('Enderecos').get('Numero'); }
  get DataNascimento() { return this.form.controls.Pessoa.get('DataNascimento'); }
  get Profissao() { return this.form.controls.Pessoa.get('Profissao'); }
  get Facebook() { return this.form.controls.Pessoa.get('Facebook'); }
  get Instagram() { return this.form.controls.Pessoa.get('Instagram'); }
  get SiglaEstadoCivil() { return this.form.controls.Pessoa.get('SiglaEstadoCivil'); }
  get Desconto() { return this.form.controls.Pessoa.get('Desconto'); }
  get Obs() { return this.form.controls.Pessoa.get('Obs'); }
  get TipoPessoa() { return this.form.controls.Pessoa.get('TipoPessoa'); }
}
