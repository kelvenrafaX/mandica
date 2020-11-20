import { Component, OnInit, ViewChild } from '@angular/core';
import { EditFuncionarioComponent } from '../../../components/funcionario/edit-funcionario/edit-funcionario.component';
import { FuncionarioService } from '../../../providers/funcionario.service';
import { Funcionario } from '../../../entity/funcionario';
import { FiltroFuncionario } from '../../../models/filtros/filtroFuncionario';


@Component({
    selector: 'app-funcionario-cliente',
    templateUrl: './funcionario.component.html',
    styleUrls: ['./funcionario.component.scss'],
    providers: [FuncionarioService]
})
export class CadastroFuncionarioComponent implements OnInit {

    @ViewChild('editFuncionarioComponent', {static: true}) EditFuncionarioComponent: EditFuncionarioComponent;

    funcionarios: Funcionario[];
    funcionariosAll: Funcionario[];
    funcionariosEdit: Funcionario;

    screen: string;

    constructor(private funcionarioService: FuncionarioService) { }

    ngOnInit() {
        this.getFuncionarios();
        this.screen = 'home';
    }

    changeScreen(screen): void {
        this.screen = screen;
    }

    getFuncionarios(): void {
        this.funcionarioService.getFuncionario()
        .subscribe( funcionarios => {
            this.funcionarios = funcionarios.filter( x => x.Pessoa.Inativo === 0);
            this.funcionariosAll = this.funcionarios;
        });
    }

    addFuncionario(funcionario: Funcionario): void {
        this.funcionarios.push(funcionario);
    }

    funcionarioSelectedEdit(funcionario: Funcionario) {
        console.log(funcionario);
        this.EditFuncionarioComponent.form.patchValue(funcionario);
        this.screen = 'editar';
    }

    funcionarioSelectedRemove(funcionario: Funcionario) {
        this.getFuncionarios();
    }

    editFuncionario(funcionario: Funcionario) {
        /*this.clientes.map(item => {
            if (item.Pessoa.No === cliente) {
                item = cliente;
            }
        });*/
        this.getFuncionarios();
    }

    filtrando(filtro: FiltroFuncionario) {
        this.funcionarios = this.funcionariosAll.filter( x => {
            if (
              (filtro.Nome === undefined || filtro.Nome.trim() === '' ||
               x.Pessoa.Nome.toLowerCase().includes(filtro.Nome.toLowerCase())) &&

              ( filtro.CpfCnpj === undefined || filtro.CpfCnpj.trim() === '' ||
               (x.Pessoa.Cpf.includes(filtro.CpfCnpj)  || x.Pessoa.Cnpj.includes(filtro.CpfCnpj)))

              && ( filtro.Celular === undefined || filtro.Celular.trim() === '' ||
               x.Pessoa.Celular.includes(filtro.Celular))) {
                return true;
              }
          });
    }

}
