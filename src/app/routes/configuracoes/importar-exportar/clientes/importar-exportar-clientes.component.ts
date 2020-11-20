import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../../../entity/cliente';
import { ClienteService } from '../../../../providers/cliente.service';
import { Pessoa } from '../../../../entity/pessoa';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-importar-exportar-clientes',
  templateUrl: './importar-exportar-clientes.component.html',
  providers: [ClienteService]
})
export class ImportarExportarClientesComponent implements OnInit {

  clientes: Cliente[];

  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;

  constructor(private clienteService: ClienteService) {

      }

  ngOnInit() {
    this.clientes = [];
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel();
  }
  readExcel() {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    };

    readFile.readAsArrayBuffer(this.fileUploaded);

    setTimeout(() => this.readAsJson(), 2000);
  }

  readAsJson() {
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    let j = 0;
    this.jsonData.map( item => {
      if (j !== 0) {
        let i = 0;

        const cliente = new Cliente();
        cliente.Pessoa = new Pessoa();

        console.log(item);

        cliente.Pessoa.Nome = item.SLAPFestas;
        cliente.Pessoa.Cpf = item.__EMPTY;
        cliente.Pessoa.Telefone = item.__EMPTY_3;
        cliente.Pessoa.Celular = item.__EMPTY_4;
        cliente.Pessoa.Email = item.__EMPTY_5;

        cliente.Pessoa.SiglaSexo = 'M';
        cliente.Pessoa.TipoPessoa = 'pf';

        // tslint:disable-next-line:forin
        /*for ( const key in item) {
          switch (i) {
            case 0 :
              cliente.Pessoa.Nome = item[key];
              break;
            case 1 :
              cliente.Pessoa.Cpf = item[key];
              break;
            case 3 :
              cliente.Pessoa.Telefone = item[key];
              break;
            case 4 :
              cliente.Pessoa.Celular = item[key];
              break;
            case 5 :
              cliente.Pessoa.Email = item[key];
              break;
          }
          i++;
        }*/
        this.clientes.push(cliente);
      }

      j++;
    });
  }

  AddClientes(): void {
    this.clienteService.addListCliente(this.clientes)
    .subscribe();
  }

}
