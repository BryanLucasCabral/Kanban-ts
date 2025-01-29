import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { Usuario } from '../../interface/usuario';
import { UsuariosService } from '../../servicos/usuarios.service';
import { CommonModule } from '@angular/common';
import { TipoTarefaService } from '../../servicos/tipo-tarefa.service';
import { StatusService } from '../../servicos/status.service';
import { Tarefa } from '../../interface/tarefa';
import { status } from '../../interface/status';
import { TipoTarefa } from '../../interface/tipoTarefa';
import { FormsModule } from '@angular/forms';
import { TarefasService } from '../../servicos/tarefas.service';

@Component({
  selector: 'app-nova-tarefa',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, FormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  usuarios: Usuario[] = [];
  tarefas: TipoTarefa[] = [];
  statuses: status[] = [];

  novaTarefa: Tarefa = {
    id: 0,
    title: "",
    created_on: "",
    author: "",
    type: "",
    status: "",
    assigned_to: ""
  }
  constructor(
    private usuarioService: UsuariosService,
    private tipoTarefaService: TipoTarefaService,
    private statuService: StatusService,
    private tarefasService: TarefasService
  ) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios
    });
    this.tipoTarefaService.listarTarefas().subscribe((tarefas) => {
      this.tarefas = tarefas
    });
    this.statuService.listarStatus().subscribe((statuses) => {
      this.statuses = statuses
    });
  }

  salvarTarefa(): void {
    this.tarefasService.cadastrarTarefa(this.novaTarefa).subscribe({
      next: (resposta) => {
        alert('Tarefa cadastrada com sucesso! ' + resposta);
        this.novaTarefa = {
          id: 0,
          title: "",
          created_on: "",
          author: "",
          type: "",
          status: "",
          assigned_to: ""
        }
      },
      error: (error) => {
        alert('Ocorreu um erro ao cadastrar a tarefa! ' + error);
        console.error(error);
      }
    });
  }
}
