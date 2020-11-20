import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { Mask } from '../../../models/mask';
import { Cep } from '../../../models/cep';
import { Fornecedor } from '../../../entity/fornecedor';
import { SerializeForm } from '../../../models/form/serialize';
import { JsonResponse } from '../../../models/JsonResponse';
import Swal from 'sweetalert2';
import { FormGroups } from '../../../models/form/form-groups';

@Component({
  selector: 'app-add-simple-fornecedor',
  templateUrl: './add-simple-fornecedor.component.html',
  providers: [ FornecedorService ],
  styleUrls: ['./add-simple-fornecedor.component.scss']
})
export class AddSimpleFornecedorComponent implements OnInit, OnChanges {

  @Output() eventAdd = new EventEmitter();
  @Input() nome: string;

  tipoPessoa: string;
  form = new FormGroups().formGroupFornecedor();
  cpfCnpjExists: JsonResponse;

  /** Mask's */
  mask: Mask = new Mask();

  constructor(private fornecedorService: FornecedorService ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nome.previousValue != changes.nome.currentValue) {
      this.form.controls.Pessoa.get('Nome').patchValue(changes.nome.currentValue);
      this.form.controls.Pessoa.get('RazaoSocial').patchValue(changes.nome.currentValue);
    }
  }

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
      this.fornecedorService.existisCpfCnpj(cpf)
      .subscribe( x => {
        this.cpfCnpjExists = x;
      });
    } else if (cnpj.length === 14) {
      this.fornecedorService.existisCpfCnpj(cnpj)
      .subscribe( x => {
        this.cpfCnpjExists = x;
      });
    }
    else {
      this.cpfCnpjExists = {Type: 'success', Title: '', Message: '', Entity: ''};
    }
  }

  addFornecedor(): void {
    const fornecedor = SerializeForm.serializePessoa<Fornecedor>(0, this.form);
    this.fornecedorService.addFornecedor(fornecedor)
    .subscribe(message => {
      if (message.Type === 'success') {
        Swal.fire(message.Title, message.Message, 'success');
      } else if (message.Type === 'warning') {
        Swal.fire(message.Title, message.Message, 'warning');
      } else if (message.Type === 'error') {
        Swal.fire(message.Title, message.Message, 'error');
      }
      if (message.Type === 'success') {
        this.clearForm();
        this.eventAdd.emit(message.Entity);
      }
    });
  }

  onSubmit() {
    this.addFornecedor();
  }

  clearForm(): void {
    this.setFormDefault();
    Swal.fire('Limpo!', 'Formulário limpo com sucesso!', 'success');
  }

  reciverTipoPessoaSelected(tipoPessoa: string) {
    this.tipoPessoa = tipoPessoa;
  }

  setFormDefault(): void {
    this.tipoPessoa = 'pf';
    this.form.patchValue(SerializeForm.serializeFormDefault());
  }

  get Nome() { return this.form.controls.Pessoa.get('Nome'); }
  get RazaoSocial() { return this.form.controls.Pessoa.get('RazaoSocial'); }
  get Cpf() { return this.form.controls.Pessoa.get('Cpf'); }
  get Cnpj() { return this.form.controls.Pessoa.get('Cnpj'); }
  get SiglaSexo() { return this.form.controls.Pessoa.get('SiglaSexo'); }
  get Telefone() { return this.form.controls.Pessoa.get('Telefone'); }
  get Celular() { return this.form.controls.Pessoa.get('Celular'); }
  get Celular2() { return this.form.controls.Pessoa.get('Celular2'); }
  get TipoPessoa() { return this.form.controls.Pessoa.get('TipoPessoa'); }

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
