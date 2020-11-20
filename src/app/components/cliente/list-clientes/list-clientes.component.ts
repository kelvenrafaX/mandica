import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FiltroCliente } from '../../../models/filtros/filtroCliente';
import { Mask } from '../../../models/mask';
import { Cep } from '../../../models/cep';
import { CepService } from '../../../providers/cep.service';
import { ClienteService } from '../../../providers/cliente.service';
import { Cliente } from '../../../entity/cliente';
import { SerializeForm } from '../../../models/form/serialize';
import { JsonResponse } from '../../../models/JsonResponse';
import Swal from 'sweetalert2';
import { formGroupCliente } from '../../../models/form/form-group-cliente';

@Component({
selector: './app-list-clientes',
templateUrl: './list-clientes.component.html',
providers: [ ClienteService, CepService ],
styleUrls: ['./list-clientes.component.scss']
})
export class ListClientesComponent implements OnInit {

    @Input() clientes: Cliente[];
    @Output() filtrando = new EventEmitter();
    @Output() eventEdit = new EventEmitter();
    @Output() eventRemove = new EventEmitter();

    clienteEdit: Cliente;
    typeTable: string;
    filtro: FiltroCliente;
    loadingClientes = true;

    tipoPessoa: string;
    form = formGroupCliente;
    cpfCnpjExists: JsonResponse;
      /** Mask's */
    mask: Mask = new Mask();

    constructor(private clienteService: ClienteService, private cepService: CepService) { }

    ngOnInit(): void {
        this.clientes = [];
        this.searchCliente();

        this.clienteEdit = new Cliente();
        this.filtro = new FiltroCliente();
        this.typeTable = 'grid';
        this.filtro.Inativo = 2;
        this.setFormDefault();
        this.cpfCnpjExists = new JsonResponse();
    }

    filter(): void {
      this.filtrando.emit(this.filtro);
    }

    remove(cliente: Cliente) {
      this.clienteService.inativar(cliente.Id, 1)
        .subscribe( message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
            this.eventRemove.emit(cliente);
        });
    }

    searchCliente(): void {
      this.loadingClientes = true;
      const buscandoCliente = setInterval( () => {
        if (this.clientes.length > 0) {
          this.loadingClientes = false;
          clearInterval(buscandoCliente);
        }
      }, 100 );
    }

    changeTable(value: string) {
        this.typeTable = value;
    }

    openModal(classicModal: any, cliente: Cliente) {
      this.clienteEdit = cliente;
      this.form.patchValue( cliente );
      this.form.patchValue( SerializeForm.serializePessoaEnderecoEdit(cliente.Pessoa) );
      classicModal.show();
    }

    inativarCliente(cliente: Cliente) {
        const status = cliente.Pessoa.Inativo === 0 ? 1 : 0;
        this.clienteService.inativar(cliente.Id, status)
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

    deleteCliente(cliente: Cliente): void {
        this.clienteService.deleteCliente(cliente.Id)
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
        this.clienteService.existisCpfCnpj(cnpjCpf)
        .subscribe( x => {
          this.cpfCnpjExists = x;
        });
      } else {
        this.cpfCnpjExists = {Type: 'success', Title: '', Message: '', Entity: ''};
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
      const cliente = SerializeForm.serializePessoa<Cliente>(this.clienteEdit.Id, this.form);
      this.clienteService.updateCliente(cliente)
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
