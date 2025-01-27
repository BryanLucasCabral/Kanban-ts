import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router: Router = new Router();
  usuario = {
    email: '',
    senha: '',
    mantermeConectado: true
  }
  fazerLogin(): void {
    console.log(this.usuario);
    if (this.usuario.mantermeConectado === true) {
      localStorage.setItem('usuario_kanban', JSON.stringify(this.usuario));
    }
    sessionStorage.setItem('usuario_kanban', JSON.stringify(this.usuario));
    this.router.navigate(['home']);
  }
}
