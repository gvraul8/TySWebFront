import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RayaResponse } from './rayaResponse';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RayaService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  iniciarPartida(): Observable<RayaResponse> {
    const url4R = `${this.apiUrl}/matches/start?juego=Tablero4R`;

    return this.httpClient.get<RayaResponse>(url4R);
  }
}
