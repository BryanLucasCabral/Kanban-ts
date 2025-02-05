import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cabecalho',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  faPlus = faPlus;
  faSignOut = faSignOut;
  tipoSelecionado: string = 'Todos'
  @Input() exibirFiltro = true;
  @Input() exibirBotaoNovaTarefa = true;

  constructor(private router: Router){}

  //emissor de evento para o component home que vai usa-lo de entrada para mostrar as tarefas
  @Output() selecaoTipo = new EventEmitter<string>();
  fazerLogout(): void {
    localStorage.removeItem('usuario_kanban');
    sessionStorage.removeItem('usuario_kanban');
    this.router.navigate(['']);
  }

  atualizarTipoSelecionado(tipo: string): void {
    this.tipoSelecionado = tipo;
    this.selecaoTipo.emit(tipo);
  }

  redirecionarNovaTarefa(): void { 
    this.router.navigate(['novaTarefa']);
  }
}
