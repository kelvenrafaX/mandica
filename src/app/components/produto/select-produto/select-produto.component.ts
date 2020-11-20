import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { SelectComponent } from 'ng2-select';
import { Fornecedor } from '../../../entity/fornecedor';
import { Pessoa } from '../../../entity/pessoa';
import { Produto, Tipo } from '../../../entity/produto';
import { ProdutoService } from '../../../providers/produto.service';

@Component({
    selector: './app-select-produto',
    templateUrl: './select-produto.component.html',
    styleUrls: ['./select-produto.component.scss'],
    providers: [ProdutoService],
    encapsulation: ViewEncapsulation.None
})
export class SelectProdutoComponent implements OnInit {

    @ViewChild ('Select' , {static: true}) public select: SelectComponent;
    @ViewChild ('addModal' , {static: true}) public modalAdd: any;
    @ViewChild ('addAcervo' , {static: true}) public addAcervo: any;
    @ViewChild ('addProduto' , {static: true}) public addProduto: any;
    @ViewChild ('addServico' , {static: true}) public addServico: any;

    items: any[] = [];
    list: Produto[] = [];
    Title = 'Produto';
    nome: string;

    @Input() active: any;
    @Input() multiple: boolean;

    @Output() eventSelected = new EventEmitter;

    constructor(private service: ProdutoService) { }

    ngOnInit(): void {
      this.addAcervo.tipo = Tipo.ACERVO;
      this.addProduto.tipo = Tipo.PRODUTO;
      this.addServico.tipo = Tipo.SERVICO;
      this.multiple = false;
      this.active = [];
      this.get();
    }

    selected(option: any) {
      if (option.id === -1) {
        const produto = new Produto();
        produto.Nome = option.text.replace(`<i class='fa fa-plus fa-fw'></i> Adicionar `, '');
        this.addAcervo.form.controls.Nome.patchValue(produto.Nome);
        this.addProduto.form.controls.Nome.patchValue(produto.Nome);
        this.addServico.form.controls.Nome.patchValue(produto.Nome);
        this.items = this.items.filter(x => x.id !== -1);
        this.active = [];
        this.refreshItems();
        this.modalAdd.show();
      } else {
        this.eventSelected.emit(option.id);
      }
    }

    get() {
      this.service.getAll(Tipo.TODOS)
      .subscribe(x => {
          this.list = x.Dados;
          this.items = [];
          x.Dados.map(y => {
            if (!y.Inativo) { this.items.push({id: y.Id, text: y.Nome}); }
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
    refresh(model: Produto): void {
      this.get();
      this.modalAdd.hide();
      this.eventSelected.emit(model.Id);
      this.select.active = [{id: model.Id, text: model.Nome}];
    }
}

