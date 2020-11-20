import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MenuCliente } from './menu-cliente';
import { MENUS } from './mock-menu-cliente';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.scss']
})
export class MenuClienteComponent implements OnInit {

  menus = MENUS;
  selectedMenu: MenuCliente;
  @Output() eventSelectedMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.selectedMenu = this.menus.find(x => x.name === 'Clientes');
    this.onSelect(this.selectedMenu);
  }

  onSelect(menu: MenuCliente): void {
    this.selectedMenu = menu;
    this.eventSelectedMenu.emit(this.selectedMenu);
  }
}
