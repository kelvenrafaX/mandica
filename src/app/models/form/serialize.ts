import { FormGroup } from '@angular/forms';
import { Pessoa } from '../../entity/pessoa';

export class SerializeForm {
  static serializePessoaEnderecoEdit(pessoa: Pessoa) {
    let dataNascimento = null;
    if (pessoa.DataNascimento != null && pessoa.DataNascimento.toString().length > 0) {
        dataNascimento = pessoa.DataNascimento.toString().split('-');
    }
    return {
      Pessoa: {
        DataNascimento: dataNascimento != null ?
         `${dataNascimento[2].toString().substring(0, 2)}/${dataNascimento[1]}/${dataNascimento[0]}`
         : null,
        Enderecos: {
            Cep: pessoa.Enderecos[0].Cep,
            Rua: pessoa.Enderecos[0].Rua,
            Bairro: pessoa.Enderecos[0].Bairro,
            Complemento: pessoa.Enderecos[0].Complemento,
            Cidade: pessoa.Enderecos[0].Cidade,
            Estado: pessoa.Enderecos[0].UF,
            Numero: pessoa.Enderecos[0].Numero,
        }
      }
    };
  }
  static serializeFormDefault() {
    return {
        Pessoa: {
          Nome: '',
          RazaoSocial: '',
          Cpf: '',
          Cnpj: '',
          NomeContato: '',
          Rg: '',
          SiglaSexo: 'M',
          Telefone: '',
          Celular: '',
          Celular2: '',
          Email: '',
          Enderecos: {
            Cep: '',
            Rua: '',
            Bairro: '',
            Complemento: '',
            Cidade: '',
            Estado: '',
            Numero: '',
          },
          DataNascimento: '',
          Desconto: '',
          Obs: '',
          TipoPessoa: 'pf',
          Tipo: '1'
        }
    };
  }
  static serializePessoa<T>(id: number, form: FormGroup): any {
    let data = null;
    if (form.controls.Pessoa.get('DataNascimento').value != null) {
      data = form.controls.Pessoa.get('DataNascimento').value.split('/');
    }

    if (form.controls.Pessoa.get('TipoPessoa').value === 'pj') {
      form.controls.Pessoa.get('Nome').patchValue(form.controls.Pessoa.get('RazaoSocial').value);
    }

      return  { Id: id,
        Pessoa: {
        Id: form.controls.Pessoa.get('Id').value,
        Nome: form.controls.Pessoa.get('Nome').value,
        RazaoSocial: form.controls.Pessoa.get('RazaoSocial').value,
        Cpf: form.controls.Pessoa.get('Cpf').value,
        Cnpj: form.controls.Pessoa.get('Cnpj').value,
        NomeContato: form.controls.Pessoa.get('NomeContato').value,
        Rg: form.controls.Pessoa.get('Rg').value,
        SiglaSexo: form.controls.Pessoa.get('SiglaSexo').value,
        Telefone: form.controls.Pessoa.get('Telefone').value,
        Celular: form.controls.Pessoa.get('Celular').value,
        Celular2: form.controls.Pessoa.get('Celular2').value,
        Email: form.controls.Pessoa.get('Email').value,
        Enderecos: [{
          Cep: form.controls.Pessoa.get('Enderecos').get('Cep').value,
          Rua: form.controls.Pessoa.get('Enderecos').get('Rua').value,
          Bairro: form.controls.Pessoa.get('Enderecos').get('Bairro').value,
          Complemento: form.controls.Pessoa.get('Enderecos').get('Complemento').value,
          Cidade: form.controls.Pessoa.get('Enderecos').get('Cidade').value,
          UF: form.controls.Pessoa.get('Enderecos').get('Estado').value,
          Numero: form.controls.Pessoa.get('Enderecos').get('Numero').value,
        }],
        DataNascimento: data != null ? new Date(`${data[2]}-${data[1]}-${data[0]} 00:00`) : '',
        Desconto: form.controls.Pessoa.get('Desconto').value,
        Obs: form.controls.Pessoa.get('Obs').value,
        TipoPessoa: form.controls.Pessoa.get('TipoPessoa').value,
        Tipo: form.controls.Pessoa.get('Tipo').value
        }
      };
  }
}
