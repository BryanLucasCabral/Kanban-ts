import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartao',
  imports: [CommonModule],
  templateUrl: './cartao.component.html',
  styleUrl: './cartao.component.css'
})
export class CartaoComponent {
  @Input() id: number = 0;
  @Input() titulo: string = "";
  @Input() dataCriacao: string = "";
  @Input() autor: string = "";
  @Input() tipo: string = "";
  @Input() responsavel: string = "";
  @Output() selecaoTarefa = new EventEmitter<number>();
//criar um emissor de evento para emitir o id da tarefa a ser excluida, emitir para o Home!  

constructor(private router: Router){}
  executarAcaoExclusao(): void {
    this.selecaoTarefa.emit(this.id);
  }

  excluirTarefaId(id: number): void{
    this.selecaoTarefa.emit(id);
  }
  
  editarTarefa(): void {
    this.router.navigate(['editarTarefa', this.id])
  }
}
