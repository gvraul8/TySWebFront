import { Injectable } from '@angular/core';

import { serverHost, serverPort } from '../../app.properties';
import { RayaComponent } from '../../raya/raya.component';

const socketUrl = `ws://${serverHost}:${serverPort}/wsGames`;

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }

  initWebSocket(msgHandler: (data: any) => void) {
    var sessionId = sessionStorage.getItem("session_id");
    console.log("httpSessionId: " + sessionId);
    console.log("socketUrl: " + socketUrl + '?httpSessionId=' + sessionId);
    const socket = new WebSocket(socketUrl + '?httpSessionId=' + sessionId);

    // Manejar eventos del WebSocket según tus necesidades
    socket.onopen = (event) => {
      console.log('Conexión WebSocket abierta:', event);
    };

    socket.onmessage = (event) => {
      let data = JSON.parse(event.data)

      console.log('Mensaje recibido:', data);

      msgHandler(data);
    };

    socket.onclose = (event) => {
      console.log('Conexión WebSocket cerrada:', event);
    };

    socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
  }

  send(message: any): void {
    var sessionId = sessionStorage.getItem("session_id");
    const socket = new WebSocket(socketUrl + '?httpSessionId=' + sessionId);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('La conexión WebSocket no está abierta.');
    }
  }
}
