import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';
import Swal from 'sweetalert2';

@Component({
    selector: './app-list-categoria',
    templateUrl: './list-categoria.component.html',
    providers: [CategoriaService],
    styleUrls: ['./list-categoria.component.scss']
})
export class ListCategoriaComponent implements OnInit {

    modalOpen;
    addDescricao: string;

    @Input() loading: boolean;
    @Input() categorias: Categoria[];
    @Output() eventEdit = new EventEmitter();
    @Output() eventAtt = new EventEmitter();

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit(): void {
        // this.loading = true;
        if (this.categorias === undefined) {
            this.categorias = [];
        }
    }

    addDisableAll() {
        this.categorias.map( x => {
            x.Add = false;
            x.Edit = false;
            x.categoriasFilhas.map( x1 => {
                x1.Add = false;
                x1.Edit = false;
                x1.categoriasFilhas.map( x2 => {
                    x2.Add = false;
                    x2.Edit = false;
                    x2.categoriasFilhas.map( x3 => {
                        x3.Add = false;
                        x3.Edit = false;
                    });
                });
            });
        });
    }

    addCategoria(categoriaPai: number): void {
        const newCategoria = new Categoria();
        newCategoria.CategoriaPaiId = categoriaPai;
        newCategoria.Descricao = this.addDescricao.toUpperCase();
        this.categoriaService.addCategoria(newCategoria)
        .subscribe( x => {
            if (x.Type === 'success') {
              Swal.fire(x.Title, x.Message, 'success');
            } else if (x.Type === 'warning') {
              Swal.fire(x.Title, x.Message, 'warning');
            } else if (x.Type === 'error') {
              Swal.fire(x.Title, x.Message, 'error');
            }
            if (x.Type === 'success') {
                this.eventAtt.emit();
                this.addDescricao = '';
            }
        });
    }

    editCategoria(categoria: Categoria): void {
        categoria.Descricao = categoria.Descricao.toUpperCase();
        this.categoriaService.updateCategoria(categoria)
        .subscribe( x => {
            if (x.Type === 'success') {
              Swal.fire(x.Title, x.Message, 'success');
            } else if (x.Type === 'warning') {
              Swal.fire(x.Title, x.Message, 'warning');
            } else if (x.Type === 'error') {
              Swal.fire(x.Title, x.Message, 'error');
            }
            if (x.Type === 'success') {
                this.eventAtt.emit();
            }
        });
    }

    deleteCategoria(categoria: Categoria): void {
        Swal.fire({
            title: 'Excluir categoria?',
            text: `Desejas realmente excluir a categoria ${categoria.Descricao}?`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                this.categoriaService.deleteCategoria(categoria.Id)
                .subscribe(x => {
                    if (x.Type === 'success') {
                        Swal.fire(x.Title, x.Message, 'success');
                    } else if (x.Type === 'warning') {
                        Swal.fire(x.Title, x.Message, 'warning');
                    } else if (x.Type === 'error') {
                        Swal.fire(x.Title, x.Message, 'error');
                    }
                    if (x.Type === 'success') {
                        this.eventAtt.emit();
                    }
                });
            }
        });
    }
}

