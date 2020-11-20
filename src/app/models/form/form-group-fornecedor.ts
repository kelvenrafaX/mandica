import { FormGroup, FormControl, Validators } from '@angular/forms';

export const formGroupFornecedor = new FormGroup({
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

