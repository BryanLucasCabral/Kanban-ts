import { Component, Input } from '@angular/core';
import { CartaoComponent } from "../../components/cartao/cartao.component";
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { Tarefa } from '../../interface/tarefa';
import { TarefasService } from '../../servicos/tarefas.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-home',
  imports: [CartaoComponent, CabecalhoComponent, RodapeComponent, CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tarefas: Tarefa[] = [];


  //Variável para controlar o tipo de tarefas que serão exibidas
  tipoSelecionado: string = 'todos';
  //Array com os possíveis status de uma tarefa
  statuses = [
    'Registrada',
    'Análise Viabilidade',
    'Análise Priorização',
    'Em Execução',
    'Pronta para Homologação',
    'Aguardando Versão',
    'Reaberta'
  ]

  @Input()exibirModal = false;
  idTarefaASerExcluida: number = 0;

  constructor(private tarefasService: TarefasService) { }

  //Utilizado para inicializar o seviço quando o compoente é renderizado na página
  ngOnInit(): void {
    this.tarefasService.listarTarefas().subscribe((tarefas) => {
      this.tarefas = tarefas;
    })
  }

  obterTarefasPorStatus(status: string): Tarefa[] {
    return this.tarefas.filter(tarefa => {
      return tarefa.status === status && (this.tipoSelecionado === 'todos' || this.tipoSelecionado === tarefa.type)
    });
  }

  atualizarTipoSelecionado(novoTipo: string) : void{
    this.tipoSelecionado = novoTipo;
  }

  confirmarExclusao(): void {
    this.exibirModal = true;
  }
  cancelarExclusao():void {
    this.exibirModal = false;
  }

  executarExclusao(): void {
    this.tarefasService.excluirTarefa(this.idTarefaASerExcluida).subscribe((resposta) => {
      alert('Tarefa excluída com sucesso!');
      window.location.reload();
    })
  }
  selecionarTarefaASerExcluida(id: number): void {
    this.idTarefaASerExcluida = id;
    this.confirmarExclusao();
  }
}
