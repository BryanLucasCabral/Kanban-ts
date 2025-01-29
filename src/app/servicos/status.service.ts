import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { status } from '../interface/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly API_URL = "http://localhost:5000/statusTarefa";
  constructor(private httpClient: HttpClient) { };

  listarStatus(): Observable<status[]> { 
    return this.httpClient.get<status[]>(this.API_URL);
  }
}
