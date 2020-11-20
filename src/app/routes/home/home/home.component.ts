import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from '../../../providers/cliente.service';
import { Eventos } from '../../../entity/eventos';
import { OrcamentoService } from '../../../providers/orcamento.service';
import { EstoqueService } from '../../../providers/estoque.service';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [ClienteService, OrcamentoService, EstoqueService],
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    $calendar: any;

    calendarOptions: any = {
        // isRTL: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonIcons: { // note the space at the beginning
            prev: ' fa fa-caret-left',
            next: ' fa fa-caret-right'
        },
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
        },
        editable: true,
        droppable: true,
        eventClick: this.eventClick.bind(this),
        dayClick: this.dayClick.bind(this)
    };

    calendarEvents: Eventos[];
    selectedEvent: Eventos = null;

    // reference to the calendar element
    @ViewChild('fullcalendar', {static: true}) fullcalendar: ElementRef;

    qtdClientes: number;
    qtdEstoque: number;
    qtdParcelasPendentes: number;
    qtdPedidos: number;

    constructor(private clienteService: ClienteService, private orcamentoService: OrcamentoService,
        private estoqueService: EstoqueService) {
        this.calendarOptions.events = this.calendarEvents;
        this.selectedEvent = new Eventos();
    }

    ngOnInit() {
        this.getQtdClientes();
        this.$calendar = $(this.fullcalendar.nativeElement);
        console.log(this.$calendar);
        this.getOrcamentos();
        this.getQtdEstoque();
    }

    ngAfterViewInit() {
        // init calendar plugin
        this.$calendar.fullCalendar(this.calendarOptions);
    }

    eventClick(calEvent, jsEvent, view) {
        this.calendarEvents.map( x => {
            console.log(x);
            if (x.title === calEvent.title) {
                this.selectedEvent = x;
            }
        });

        console.log('Event: ' + calEvent.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);
    }

    dayClick(date, jsEvent, view) {
        this.selectedEvent = {
            date: date.format()
        };
    }

    addEvent(event) {
        // store event
        this.calendarEvents.push(event);
        // display event in calendar
        this.$calendar.fullCalendar('renderEvent', event, true);
    }

    ngOnDestroy() {
        this.$calendar.fullCalendar('destroy');
    }

    getOrcamentos(): void {
        this.orcamentoService.getOrcamentos()
          .subscribe(x => {
            this.qtdPedidos = 0;

            x.map( orcamento => {
                if (orcamento.Status === 'Pedido finalizado') {
                    this.qtdPedidos++;
                }
            });

            this.calendarEvents = [];
            let event: Eventos;
            x.map( orcamento => {
                event = new Eventos();
                event.title = `Nº ${orcamento.Id} - ${orcamento.Cliente.Pessoa.Nome}`;
                event.start = orcamento.DataEntrega;
                event.backgroundColor = '#3c8dbc';
                event.borderColor = '#3c8dbc';
                event.orcamento = orcamento;
                this.calendarEvents.push(event);
                this.$calendar.fullCalendar('renderEvent', event, true);
            });
          });
    }

    getQtdClientes(): void {
        this.clienteService.getClientes()
            .subscribe(x => this.qtdClientes = x.length);
    }

    getQtdEstoque(): void {
        this.estoqueService.getEstoques()
            .subscribe( estoques => {
                this.qtdEstoque = 0;
                estoques.Dados.map( estoque => {
                    this.qtdEstoque += (estoque.Entrada - estoque.Saida);
                } );
            } );
    }
}
