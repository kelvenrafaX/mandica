import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FuncionarioService } from '../../../providers/funcionario.service';
import { formGroupFuncionario } from '../add-funcionario/form-group-funcionario';
import { CepService } from '../../../providers/cep.service';
import { JsonResponse } from '../../../models/JsonResponse';
import { Mask } from '../../../models/mask';
import { SerializeForm } from '../../../models/form/serialize';
import { Funcionario } from '../../../entity/funcionario';
import Swal from 'sweetalert2';
import { Cep } from '../../../models/cep';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.scss'],
  providers: [FuncionarioService, CepService]
})
export class EditFuncionarioComponent implements OnInit {

  @Output() ChangeScreen = new EventEmitter();
  @Output() eventEdit = new EventEmitter;

  tipoPessoa: string;
  form = formGroupFuncionario;
  cpfCnpjExists: JsonResponse;

  /** Mask's */
  mask: Mask = new Mask();

  constructor(public http: HttpClient, private funcionarioService: FuncionarioService,
    private cepService: CepService) { }

  ngOnInit() {
    this.setFormDefault();
    this.cpfCnpjExists = new JsonResponse();
  }

  validCpfCnpj() {
    let cpf = this.form.controls.Pessoa.get('Cpf').value;
    let cnpj = this.form.controls.Pessoa.get('Cnpj').value;
    if (cpf !=  null && typeof cpf === 'string') {
      cpf = cpf.substring(0, cpf.length).replace(/[^\d\s]/gi, '');
    }
    if (cnpj !=  null && typeof cnpj === 'string') {
      cnpj = cnpj.substring(0, cnpj.length).replace(/[^\d\s]/gi, '');
    }
    if (cpf.length === 11) {
      this.funcionarioService.existisCpfCnpj(cpf)
      .subscribe( x => {
        this.cpfCnpjExists = x;
      });
    } else if (cnpj.length === 14) {
      this.funcionarioService.existisCpfCnpj(cnpj)
      .subscribe( x => {
        this.cpfCnpjExists = x;
      });
    }
    else {
      this.cpfCnpjExists = {Type: 'success', Title: '', Message: '', Entity: {}};
    }
  }

  addFuncionario(): void {
    const funcionario = SerializeForm.serializePessoa<Funcionario>(this.form.controls.Id.value, this.form);
    this.funcionarioService.updateFuncionario(funcionario)
    .subscribe( message => {
      if (message.Type === 'success') {
        Swal.fire(message.Title, message.Message, 'success');
      } else if (message.Type === 'warning') {
        Swal.fire(message.Title, message.Message, 'warning');
      } else if (message.Type === 'error') {
        Swal.fire(message.Title, message.Message, 'error');
      }
      if (message.Type === 'success') {
        this.clearForm();
        this.eventEdit.emit(funcionario);
        this.ChangeScreen.emit('home');
      }
    });
  }

  carregarEndereco(): void {
    const cep: any = this.form.controls.Pessoa.get('Enderecos').get('Cep').value;
    this.cepService.getEndereco(cep)
      .subscribe((data: Cep) => {
         this.popularCamposCep(data);
      });
  }

  onSubmit() {
    this.addFuncionario();
  }

  clearForm(): void {
    this.setFormDefault();
  }

  reciverTipoPessoaSelected(tipoPessoa: string) {
    this.tipoPessoa = tipoPessoa;
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

  setFormDefault(): void {
    this.tipoPessoa = 'pf';
    this.form.patchValue(SerializeForm.serializeFormDefault());
  }

  get Nome() { return this.form.controls.Pessoa.get('Nome'); }
  get RazaoSocial() { return this.form.controls.Pessoa.get('RazaoSocial'); }
  get Cpf() { return this.form.controls.Pessoa.get('Cpf'); }
  get Cnpj() { return this.form.controls.Pessoa.get('Cnpj'); }
  get NomeContato() { return this.form.controls.Pessoa.get('NomeContato'); }
  get Rg() { return this.form.controls.Pessoa.get('Rg'); }
  get SiglaSexo() { return this.form.controls.Pessoa.get('SiglaSexo'); }
  get Telefone() { return this.form.controls.Pessoa.get('Telefone'); }
  get Celular() { return this.form.controls.Pessoa.get('Celular'); }
  get Celular2() { return this.form.controls.Pessoa.get('Celular2'); }
  get Email() { return this.form.controls.Pessoa.get('Email'); }
  get Cep() { return this.form.controls.Pessoa.get('Enderecos').get('Cep'); }
  get Estado() { return this.form.controls.Pessoa.get('Enderecos').get('Estado'); }
  get Rua() { return this.form.controls.Pessoa.get('Enderecos').get('Rua'); }
  get Bairro() { return this.form.controls.Pessoa.get('Enderecos').get('Bairro'); }
  get Cidade() { return this.form.controls.Pessoa.get('Enderecos').get('Cidade'); }
  get Complemento() { return this.form.controls.Pessoa.get('Enderecos').get('Complemento'); }
  get Numero() { return this.form.controls.Pessoa.get('Enderecos').get('Numero'); }
  get DataNascimento() { return this.form.controls.Pessoa.get('DataNascimento'); }
  get Desconto() { return this.form.controls.Pessoa.get('Desconto'); }
  get Obs() { return this.form.controls.Pessoa.get('Obs'); }
  get TipoPessoa() { return this.form.controls.Pessoa.get('TipoPessoa'); }
  get Tipo() { return this.form.controls.Pessoa.get('Tipo'); }

  validCadastroPf(): boolean {
    return this.form.controls.Pessoa.get('TipoPessoa').valid &&
    this.form.controls.Pessoa.get('Nome').valid &&
    this.form.controls.Pessoa.get('Cpf').valid &&
    this.form.controls.Pessoa.get('Celular').valid;
  }

  validCadastroPj(): boolean {
    return this.form.controls.Pessoa.get('TipoPessoa').valid &&
    this.form.controls.Pessoa.get('RazaoSocial').valid &&
    this.form.controls.Pessoa.get('Cnpj').valid &&
    this.form.controls.Pessoa.get('Celular').valid;
  }

}
