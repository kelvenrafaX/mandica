import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';

@Component({
    selector: 'app-cadastro-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.scss'],
    providers: [CategoriaService]
})
export class CadastroCategoriaComponent implements OnInit {

    categorias: Categoria[];
    loading: boolean;

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit() {
        this.getCategorias();
    }

    getCategorias(): void {
        this.loading = true;
        this.categoriaService.getCategorias()
        .subscribe( categorias => {
            this.loading = false;
            this.categorias = categorias;
        });
    }

    eventAdd(categoria: Categoria): void {
        this.categorias.push(categoria);
    }

    eventEdit(categoria: Categoria): void {
        this.categorias.map( x => {
            if (x.Id === categoria.Id) {
                x = categoria;
            }
        });
    }

    refresh(): void {
        this.getCategorias();
    }

}
