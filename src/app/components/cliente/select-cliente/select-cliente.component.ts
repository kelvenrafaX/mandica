import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { SelectComponent } from 'ng2-select';
import { Pessoa } from '../../../entity/pessoa';
import { Cliente } from '../../../entity/cliente';
import { ClienteService } from '../../../providers/cliente.service';

@Component({
    selector: './app-select-cliente',
    templateUrl: './select-cliente.component.html',
    styleUrls: ['./select-cliente.component.scss'],
    providers: [ClienteService],
    encapsulation: ViewEncapsulation.None
})
export class SelectClienteComponent implements OnInit {

    @ViewChild ('Select' , {static: true}) public select: SelectComponent;
    @ViewChild ('addModal' , {static: true}) public modalAdd: any;

    items: any[] = [];
    list: Cliente[] = [];
    Title = 'Cliente';
    nome: string;

    @Input() active: any;
    @Input() multiple: boolean;

    @Output() eventSelected = new EventEmitter;

    constructor(private service: ClienteService) { }

    ngOnInit(): void {
      this.multiple = false;
      this.active = [];
      this.get();
    }

    selected(option: any) {
      if (option.id === -1) {
        const cliente = new Cliente();
        cliente.Pessoa = new Pessoa();
        cliente.Pessoa.Nome = option.text.replace(`<i class='fa fa-plus fa-fw'></i> Adicionar `, '');
        this.nome = cliente.Pessoa.Nome;
        this.modalAdd.show();
      } else {
        this.eventSelected.emit(this.list.filter(x => x.Id === option.id)[0]);
      }
    }

    get() {
      this.service.getClientes()
      .subscribe(x => {
          this.list = x;
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
    refresh(cliente: Cliente): void {
      this.get();
      this.modalAdd.hide();
      this.eventSelected.emit(this.list.filter(x => x.Id === cliente.Id)[0]);
      this.select.active = [{id: cliente.Id, text: cliente.Pessoa.Nome}];
    }
}

