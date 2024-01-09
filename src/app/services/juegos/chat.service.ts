import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverHost, serverPort } from '../../app.properties';

const urlEnviarChat = `http://${serverHost}:${serverPort}/matches/sendMessageChat`;

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private httpClient: HttpClient) {}

  enviarMensajeChat(usuario: string, mensaje: string): Observable<any> {
    const messageInfo = {
      "user": usuario,
      "msg": mensaje
    };

    console.log(urlEnviarChat)
    console.log('USER ' + usuario + ': ' + mensaje)

    return this.httpClient.post(urlEnviarChat, messageInfo, { withCredentials: true });
  }

}
