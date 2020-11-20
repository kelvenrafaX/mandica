import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CargoService } from '../../../providers/cargo.service';
import { Cargo } from '../../../entity/cargo';


@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
  providers: [CargoService]
})
export class CargoComponent implements OnInit {

   cargos: Cargo[];
   cargo:Cargo;
   nameButton : String;

  constructor(private cargoService: CargoService) { }

  ngOnInit() {

    this.cargos=[];
    this.cargo = new Cargo();
    this.nameButton = "Cadastrar"
    this.getCargo();
  }

  getCargo(): void {
    this.cargoService.getCargo()
      .subscribe( x => {
        this.cargos = x;
      });
  }

  gerarCargo(){
    if(this.nameButton == "Cadastrar"){
      this.addCargo();
    }else{
      this.update();
    }
  }
 
  addCargo(): void {
    var cargoAdd = this.cargo;
    cargoAdd.Ativa = true;
    this.cargoService.addCargo(cargoAdd)
      .subscribe(message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, message.Type);
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }

        if (message.Type === 'success') {
          
          this.ngOnInit();
        }
      });

  }

  update(): void {
    this.cargoService.updateCargo(this.cargo)
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
        this.ngOnInit();
      }
    });
  }

  editarCargo(cargo:Cargo){
    this.nameButton = "Editar";
    console.log(this.cargo)
    if(this.cargo.Id){
      Swal.fire("Cargo", "Já existe um cargo em edição", 'error');
    }else{
      this.cargo = cargo;
      this.cargos = this.cargos.filter(x=>x.Descricao != cargo.Descricao);

    }
 

  }
  mudarStatus(cargo:Cargo) {
     
    this.cargoService.mudarStatus(cargo).subscribe(x =>{
      this.getCargo();
    });
  }
}
