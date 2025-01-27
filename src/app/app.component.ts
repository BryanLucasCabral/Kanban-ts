import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./components/cabecalho/cabecalho.component";
import { RodapeComponent } from "./components/rodape/rodape.component";
import { CartaoComponent } from "./components/cartao/cartao.component";
import { ModalComponent } from "./components/modal/modal.component";
import { LoginComponent } from "./paginas/login/login.component";
import { HomeComponent } from "./paginas/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabecalhoComponent, RodapeComponent, CartaoComponent, ModalComponent, LoginComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanban-ts';
}
