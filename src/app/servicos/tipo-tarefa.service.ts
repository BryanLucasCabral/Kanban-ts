import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoTarefa } from '../interface/tipoTarefa';

@Injectable({
  providedIn: 'root'
})
export class TipoTarefaService {

  private readonly API_URL = "http://localhost:5000/tiposTarefas";
  constructor(private httpClient: HttpClient) { };

  listarTarefas(): Observable<TipoTarefa[]> { 
    return this.httpClient.get<TipoTarefa[]>(this.API_URL);
  }
}
