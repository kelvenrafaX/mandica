import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';
import Swal from 'sweetalert2';

@Component({
selector: './app-edit-categoria',
templateUrl: './edit-categoria.component.html',
providers: [ CategoriaService ],
styleUrls: ['./edit-categoria.component.scss']
})
export class EditCategoriaComponent implements OnInit {

   categoria: Categoria;
   @Input() categorias: Categoria[];
   categoriaId: number;
   @Output() eventEdit = new EventEmitter();

   constructor ( private categoriaService: CategoriaService ) {}

   ngOnInit() {
     this.categorias = [];
     this.categoria = new Categoria();
   }

   /*montarCategoria(): Categoria {
     this.categoria.Ativa = true;
     this.categoria.Edit = false;
     this.categoria.Descricao = this.categoria.Descricao.toUpperCase();
     this.categoria.CategoriaPaiId = this.categoriaPai;
     return this.categoria;
   }*/

   getCategoria(categoriaId): void {
    this.categoriaId = categoriaId;
    this.categoriaService.getCategoriaById(categoriaId)
    .subscribe( categoria => {
      this.categoria = categoria;
    });
   }

   editCategoria(): void {
    this.categoriaService.updateCategoria(this.categoria)
     .subscribe( x => {
        if (x.Type === 'success') {
          Swal.fire(x.Title, x.Message, 'success');
        } else if (x.Type === 'warning') {
          Swal.fire(x.Title, x.Message, 'warning');
        } else if (x.Type === 'error') {
          Swal.fire(x.Title, x.Message, 'error');
        }
        if (x.Type === 'success') {
            const categoria = new Categoria();
            categoria.Ativa = this.categoria.Ativa;
            categoria.Descricao = this.categoria.Descricao;
            categoria.Edit = this.categoria.Edit;
            categoria.Id = this.categoria.Id;
            categoria.categoriasFilhas = this.categoria.categoriasFilhas;
            categoria.CategoriaPaiId = this.categoria.CategoriaPaiId;
            this.eventEdit.emit(categoria);
            this.categoria.Descricao = '';
        }
     });
   }

   validExists(): boolean {
     let exists = true;
     this.categorias.map( cat => {
        if (this.categoria.Descricao &&
          this.categoria.Descricao.toString().toLowerCase() === cat.Descricao.toString().toLowerCase()) {
            exists = false;
        }
     });

     return exists;
   }

   valid(): boolean {
    return this.validExists() && this.categoria.Descricao && this.categoria.Descricao.length > 0;
   }
}

