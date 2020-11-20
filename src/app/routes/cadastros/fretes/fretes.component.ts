import { Component, OnInit } from '@angular/core';
import { FretesService } from '../../../providers/fretes.service';
import { Fretes } from '../../../entity/fretes';

@Component({
    selector: 'app-cadastro-fretes',
    templateUrl: './fretes.component.html',
    styleUrls: ['./fretes.component.scss'],
    providers: [FretesService]
})
export class CadastroFretesComponent implements OnInit {

    fretes: Fretes[];
    fretesAll: Fretes[];
    lista: {id: string, nome: string, bairros: Fretes[], valor: number, add: boolean}[];
    listaAll: {id: string, nome: string, bairros: Fretes[], valor: number, add: boolean}[];
    bairro: Fretes;
    filtroCidade: string;
    filtroBairro: string;

    constructor(private fretesService: FretesService) { }

    ngOnInit() {
        this.filtroCidade = '';
        this.filtroBairro = '';
        this.bairro = new Fretes();
        this.lista = [];
        this.listaAll = [];
        this.getFretes();
    }

    activeAdd(cidade: any) {
        this.getCidade(cidade).add = !cidade.add;

        this.filtrar();
    }

    filtrar(): void {
        this.lista = this.deepCopy(this.listaAll.filter(

        x => (this.filtroCidade.trim() === '' ||
        x.nome.trim().toUpperCase().includes(this.filtroCidade.trim().toUpperCase()))

        &&

        (this.filtroBairro.trim() === '' ||
        x.bairros.filter( y =>  y.Nome.trim().toUpperCase().includes(this.filtroBairro.trim().toUpperCase())).length > 0)

        ));

        if (this.filtroBairro.trim() !== '') {
            this.lista.map( x => {
                x.bairros = x.bairros.filter( y =>  y.Nome.trim().toUpperCase().includes(this.filtroBairro.trim().toUpperCase()));
                if (x.bairros.length > 0) {
                    x.add = true;
                }
            });
        }
    }

    deepCopy(obj) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj) {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = this.deepCopy(obj[attr]);
                }
            }
            return copy;
        }

        throw new Error(`Unable to copy obj! Its type isn't supported.`);
    }

    getCidade(cidade: any) {
        return this.listaAll.filter( x => x.id === cidade.id)[0];
    }

    addBairro(cidade: any): void {
        this.getCidade(cidade).bairros.push(this.bairro);
        this.bairro = new Fretes();
        this.filtrar();
    }

    replicar(cidade: any): void {
        this.getCidade(cidade).bairros.map(x => {
            x.Valor = cidade.valor;
        });
        this.filtrar();
    }

    getFretes(): void {

        this.fretesService.getCidades()
        .subscribe( bairros => {
            bairros.map(bairro => {
                const municipio = {id: bairro.id,
                    nome: bairro.nome, bairros: [], valor: 0, add: false};
                this.listaAll.push(municipio);
            });

            this.filtrar();
        });

        this.fretesService.getAll()
        .subscribe( fretes => {
            this.fretes = fretes;
            this.fretesAll = fretes;
        });
    }
}
