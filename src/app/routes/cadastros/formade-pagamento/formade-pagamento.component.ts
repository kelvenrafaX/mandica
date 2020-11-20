import { Component, OnInit } from '@angular/core';
import { Natureza } from '../../../entity/natureza';
import { NaturezaService } from '../../../providers/natureza.service';
import Swal from 'sweetalert2';
import { NaturezaParcelas } from '../../../entity/natureza-parcelas';

@Component({
  selector: 'app-formade-pagamento',
  templateUrl: './formade-pagamento.component.html',
  styleUrls: ['./formade-pagamento.component.scss'],
  providers: [NaturezaService]
})
export class CadastroFormadePagamentoComponent implements OnInit {

  formas: Natureza[];
  forma: Natureza;
  formaSelected: Natureza;

  naturezaParcela: NaturezaParcelas;

  constructor(private naturezaService: NaturezaService) { }

  ngOnInit() {
    this.formaSelected = new Natureza();
    this.formaSelected.NaturezaParcelas = [];
    this.setFormDefault();
    this.formas = [];
    this.getNaturezas();
  }

  getNaturezas(): void {
    this.naturezaService.getNaturezas()
      .subscribe( x => {
        this.formas = x;
      });
  }

  addNatureza(): void {
    this.naturezaService.addNatureza(this.forma)
      .subscribe(message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, message.Type);
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }

        if (message.Type === 'success') {
          this.setFormDefault();
          this.getNaturezas();
        }
      });

  }

  setFormDefault(): void {
    this.forma = new Natureza();
    this.forma.Descricao = '';
    this.forma.Ativa = true;
    this.forma.NaturezaParcelas = [];

    this.naturezaParcela = new NaturezaParcelas();
  }

  addNaturezaParcela(): void {
    this.naturezaParcela.NaturezaId = this.formaSelected.Id;
    this.formaSelected.NaturezaParcelas.push(this.naturezaParcela);
    console.log(this.formaSelected.NaturezaParcelas);
    this.naturezaService.updateNatureza(this.formaSelected)
    .subscribe( message => {
      if (message.Type === 'success') {
        Swal.fire(message.Title, message.Message, message.Type);
      } else if (message.Type === 'warning') {
        Swal.fire(message.Title, message.Message, 'warning');
      } else if (message.Type === 'error') {
        Swal.fire(message.Title, message.Message, 'error');
      }

      if (message.Type === 'success') {
        // this.setFormDefault();
        this.naturezaParcela = new NaturezaParcelas();
        this.getNaturezas();
      } else {
        this.formaSelected.NaturezaParcelas.pop();
      }
    });
  }

  selected(natureza: Natureza, modal: any): void {
    this.formaSelected = natureza;
    modal.show();
  }

  update(natureza: Natureza): void {
    this.naturezaService.updateNatureza(natureza)
    .subscribe( message => {
      if (message.Type === 'success') {
        Swal.fire(message.Title, message.Message, message.Type);
      } else if (message.Type === 'warning') {
        Swal.fire(message.Title, message.Message, 'warning');
      } else if (message.Type === 'error') {
        Swal.fire(message.Title, message.Message, 'error');
      }

      if (message.Type === 'success') {
        // this.setFormDefault();
        this.getNaturezas();
      }
    });
  }
}
