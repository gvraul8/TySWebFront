import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableroHundirFlota } from './juegosResponse';
import { serverHost, serverPort } from '../../app.properties';
import { JuegosResponse } from './juegosResponse';

const urlHFStart = `http://${serverHost}:${serverPort}/matches/start?juego=TableroHundirFlota`;
const urlHFPlay = `http://${serverHost}:${serverPort}/matches/play?juego=TableroHundirFlota`;
const urlHFPoner = `http://${serverHost}:${serverPort}/matches/poner`;
const urlHFAbandonar = `http://${serverHost}:${serverPort}/matches/abandonar`;



@Injectable({
  providedIn: 'root',
})
export class HundirFlotaService {

  constructor(private httpClient: HttpClient) {}

  iniciarPartida(latitud: string, longitud: string): Observable<JuegosResponse> {
    console.log('iniciarPartida() EN FLOTA SERVICE');
    // Iniciar conexión ws con el servidor cuando la partida se ha creado correctamente

    return this.httpClient.post<JuegosResponse>(urlHFStart,  {"lat": latitud, "lon": longitud }, {withCredentials: true});
  }

  play(idPartida: String) {
    console.log('play() EN FLOTA SERVICE');
    console.log('play() idPartida:', idPartida);
    return this.httpClient.post(urlHFPlay, {"id": idPartida}).subscribe(
      (response) => {
        console.log('play() response:', response);
      },
      (error) => {
        console.error('play() error:', error);
      }
    )
  }

  ponerFicha(idPartida: string, columna: number, fila: number): Observable<any> {
    console.log('ponerFicha() EN FLOTA SERVICE');
    const requestBody = {
      "id": idPartida,
      "columna": columna, 
      "fila": fila
    };
  
    return this.httpClient.post(urlHFPoner, requestBody, { withCredentials: true });
  }

  abandonarPartida(idPartida: string): Observable<any> {
    return this.httpClient.post(urlHFAbandonar, {"id": idPartida}, { withCredentials: true });

  }
}
