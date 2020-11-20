import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { SelectComponent } from 'ng2-select';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { Fornecedor } from '../../../entity/fornecedor';
import { Pessoa } from '../../../entity/pessoa';

@Component({
    selector: './app-select-fornecedor',
    templateUrl: './select-fornecedor.component.html',
    styleUrls: ['./select-fornecedor.component.scss'],
    providers: [FornecedorService],
    encapsulation: ViewEncapsulation.None
})
export class SelectFornecedorComponent implements OnInit {

    @ViewChild ('Select' , {static: true}) public select: SelectComponent;
    @ViewChild ('addModal' , {static: true}) public modalAdd: any;

    items: any[] = [];
    fornecedores: Fornecedor[] = [];
    Title = 'Fornecedor';
    nome: string;

    @Input() active: any;
    @Input() multiple: boolean;

    @Output() eventSelected = new EventEmitter;

    constructor(private service: FornecedorService) { }

    ngOnInit(): void {
      this.multiple = false;
      this.active = [];
      this.get();
    }

    selected(option: any) {
      if (option.id === -1) {
        const fornecedor = new Fornecedor();
        fornecedor.Pessoa = new Pessoa();
        fornecedor.Pessoa.Nome = option.text.replace(`<i class='fa fa-plus fa-fw'></i> Adicionar `, '');
        this.nome = fornecedor.Pessoa.Nome;
        this.modalAdd.show();
      } else {
        this.eventSelected.emit(option.id);
      }
    }

    get() {
      this.service.getFornecedores()
      .subscribe(x => {
          this.fornecedores = x;
          this.items = [];
          x.map(y => {
            if (!y.Pessoa.Inativo) { this.items.push({id: y.Id, text: y.Pessoa.Nome}); }
          });

          this.refreshItems();
      });
    }

    onKey(event: any) {

      this.items = this.items.filter(x => x.id !== -1);
      this.refreshItems();

      if (event.srcElement.value !== undefined && this.items
        .filter(x => x.text.toString().toUpperCase().includes(event.srcElement.value.toString().toUpperCase())).length === 0) {
          this.items.push({ id: -1, text: `<i class='fa fa-plus fa-fw'></i> Adicionar ${event.srcElement.value.toString()}`});
          this.refreshItems();
      }
    }

    refreshItems(): void {
      this.select.items = this.items;
      setTimeout(() => {
        if (this.select.element.nativeElement.querySelector('.ui-select-search') !== null) {
          this.select.element.nativeElement.querySelector('.ui-select-search').dispatchEvent(new Event('keyup'));
        }
      });
    }


    // Output's do component list categoria
    refresh(fornecedor: Fornecedor): void {
      this.get();
      this.modalAdd.hide();
      this.eventSelected.emit(fornecedor.Id);
      this.select.active = [{id: fornecedor.Id, text: fornecedor.Pessoa.Nome}];
    }
}

