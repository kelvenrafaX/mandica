import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';
import Swal from 'sweetalert2';
import { SelectComponent } from 'ng2-select';

@Component({
    selector: './app-select-categoria',
    templateUrl: './select-categoria.component.html',
    styleUrls: ['./select-categoria.component.scss'],
    providers: [CategoriaService],
    encapsulation: ViewEncapsulation.None
})
export class SelectCategoriaComponent implements OnInit, OnChanges {

    @ViewChild ('Select' , {static: true}) public select: SelectComponent;

    items: any[] = [];
    categorias: Categoria[] = [];
    Title = 'Categoria';
    loading: boolean;

    @Input() active: any;
    @Input() multiple: boolean;
    @Input() paiId: number;

    @Output() eventSelected = new EventEmitter;

    constructor(private service: CategoriaService) { }

    ngOnInit(): void {
      this.loading = false;
      this.multiple = false;
      this.active = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.paiId !== undefined && changes.paiId.currentValue !== changes.paiId.previousValue) {
        this.paiId = parseInt(changes.paiId.currentValue, 0);
        this.get();
      }
    }

    selected(option: any) {
      if (option.id === -1) {
        const categoria = new Categoria();
        categoria.Descricao = option.text.replace(`<i class='fa fa-plus fa-fw'></i> Adicionar `, '');
        categoria.CategoriaPaiId = this.paiId + 1;
        categoria.Ativa = true;
        this.service.addCategoria(categoria)
        .subscribe( x => {
          if (x.Type === 'success') {
            Swal.fire(x.Title, x.Message, 'success');
          } else if (x.Type === 'warning') {
            Swal.fire(x.Title, x.Message, 'warning');
          } else if (x.Type === 'error') {
            Swal.fire(x.Title, x.Message, 'error');
          }

          if (x.Type === 'success') {
            this.get();
            this.eventSelected.emit(x.Entity.Id);
            this.select.active = [{id: x.Entity.Id, text: x.Entity.Descricao}];
          }
        });
      } else {
        this.eventSelected.emit(option.id);
      }
    }

    get() {
      this.loading = true;

      this.service.getCategorias()
      .subscribe(x => {
        console.log(this.paiId);
        this.categorias = x.filter(y => y.Id === this.paiId + 1);
      });

      this.service.getCategoriasPorTipo(this.paiId)
      .subscribe(x => {

          this.items = [];

          x.map(y => {
            if (y.Ativa) { this.items.push({id: y.Id, text: y.Descricao}); }
          });

          this.refresh();

          this.loading = false;
      });
    }

    onKey(event: any) {

      this.items = this.items.filter(x => x.id !== -1);
      this.refresh();

      if (event.srcElement.value !== undefined && this.items
        .filter(x => x.text.toString().toUpperCase().includes(event.srcElement.value.toString().toUpperCase())).length === 0) {
          this.items.push({ id: -1, text: `<i class='fa fa-plus fa-fw'></i> Adicionar ${event.srcElement.value.toString().toUpperCase()}`});
          this.refresh();
      }
    }

    refresh(): void {
      this.select.items = this.items;
      setTimeout(() => {
        if (this.select.element.nativeElement.querySelector('.ui-select-search') !== null) {
          this.select.element.nativeElement.querySelector('.ui-select-search').dispatchEvent(new Event('keyup'));
        }
      });
    }


    // Output's do component list categoria
    refreshCategoria(): void {
      this.get();
    }
}

