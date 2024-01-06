import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RayaResponse } from './rayaResponse';
import { serverHost, serverPort } from '../../app.properties';

const url4RStart = `http://${serverHost}:${serverPort}/matches/start?juego=Tablero4R`;
const url4RPlay = `http://${serverHost}:${serverPort}/matches/play?juego=Tablero4R`;
const url4RPoner = `http://${serverHost}:${serverPort}/matches/poner`;
const url4RAbandonar = `http://${serverHost}:${serverPort}/matches/abandonar`;



@Injectable({
  providedIn: 'root',
})
export class RayaService {

  constructor(private httpClient: HttpClient) {}

  iniciarPartida(latitud: string, longitud: string): Observable<RayaResponse> {
    // Iniciar conexión ws con el servidor cuando la partida se ha creado correctamente

    return this.httpClient.post<RayaResponse>(url4RStart,  {"lat": latitud, "lon": longitud }, {withCredentials: true});
  }

  play(idPartida: String) {
    console.log('play() idPartida:', idPartida);
    return this.httpClient.post(url4RPlay, {"id": idPartida}).subscribe(
      (response) => {
        console.log('play() response:', response);
      },
      (error) => {
        console.error('play() error:', error);
      }
    )
  }

  ponerFicha(idPartida: string, columna: number): Observable<any> {
    const requestBody = {
      "id": idPartida,
      "columna": columna
    };
  
    return this.httpClient.post(url4RPoner, requestBody, { withCredentials: true });
  }

  abandonarPartida(idPartida: string): Observable<any> {
    return this.httpClient.post(url4RAbandonar, {"id": idPartida}, { withCredentials: true });

  }
}
