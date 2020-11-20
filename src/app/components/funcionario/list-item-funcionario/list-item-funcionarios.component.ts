import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FuncionarioService } from '../../../providers/funcionario.service';
import { Funcionario } from '../../../entity/funcionario';
import { FiltroFuncionario } from '../../../models/filtros/filtroFuncionario';

@Component({
selector: './app-list-item-funcionarios',
templateUrl: './list-item-funcionarios.component.html',
providers: [ FuncionarioService ],
styleUrls: ['./list-item-funcionarios.component.scss']
})
export class ListItemFuncionariosComponent implements OnInit {

    funcionarios:Funcionario[] = [];
    @Output() eventfuncionarioSelecionado = new EventEmitter();
    checked: number;
    filtro: FiltroFuncionario;

    constructor(private funcionarioService: FuncionarioService) { }

    ngOnInit(): void {
        this.filtro = new FiltroFuncionario();
        this.getFuncionarios();
    }

    check(i: number): void {
        this.checked = i;
        let funcionario: Funcionario;
        this.funcionarios.forEach(function(element, index) { if (index === i) { funcionario = element; }});
        this.eventfuncionarioSelecionado.emit(funcionario);
    }

    getFuncionarios(): void {
        this.funcionarioService.getfuncionariosFiltrado(this.filtro)
          .subscribe(x => {
            this.funcionarios = [];
            x.Dados.map( funcionario => this.funcionarios.push(funcionario));
            this.check(0);
          });
    }
    

    editFuncionario(funcionario: Funcionario): void {
        alert(`Editando o funcionario ${funcionario.Pessoa.Nome}`);
        // TODO Abrir formulário para edição
    }

    deleteFuncionario(funcionario: Funcionario): void {
        this.funcionarioService.deleteFuncionario(funcionario.Id)
            .subscribe(message => {
                console.log(message);
                this.getFuncionarios();
            });
    }
}
