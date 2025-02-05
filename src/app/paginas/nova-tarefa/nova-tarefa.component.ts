import { Component, Input, input } from '@angular/core';
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
import { ModalComponent } from "../../components/modal/modal.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-tarefa',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, FormsModule, ModalComponent],
  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  usuarios: Usuario[] = [];
  tarefas: TipoTarefa[] = [];
  statuses: status[] = [];
  @Input() exibirModal = false;

  novaTarefa: Tarefa = {
    id: 0,
    title: "",
    created_on: "",
    author: "",
    type: "",
    status: "",
    assigned_to: ""
  }

  edicao: boolean = false;
  constructor(
    private usuarioService: UsuariosService,
    private tipoTarefaService: TipoTarefaService,
    private statuService: StatusService,
    private tarefasService: TarefasService,
    private router: Router,
    private route: ActivatedRoute
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
    // Carregar dados da tarefa caso exista um id na rota
    this.route.paramMap.subscribe((parametros) => {
      const id = Number(parametros.get('id'));
      if (id) {
        this.carregarDadosTarefa(id);
        this.edicao = true;
      }
    })
  }

  salvarTarefa(): void {
    if (this.novaTarefa.id !== 0) {
      this.tarefasService.atualizarTarefa(this.novaTarefa.id, this.novaTarefa).subscribe((resposta) => {
        alert('Tarefa atualizada com sucesso!');
        this.router.navigate(['home'])
      })
    } else {
      this.tarefasService.cadastrarTarefa(this.novaTarefa).subscribe({
        next: (resposta) => {
          this.exibirModal = true;
        },
        error: (error) => {
          alert('Ocorreu um erro ao cadastrar a tarefa! ' + error);
          console.error(error);
        }
      });
    }
  }
  redirecionarParaHome(): void {
    this.router.navigate(['home'])
  }
  redirecionarNovaTarefa(): void {
    window.location.reload()
  }
  carregarDadosTarefa(id: number): void {
    this.tarefasService.obterTarefa(id).subscribe((resposta) => {
      this.novaTarefa = resposta;
    })
  }
}
