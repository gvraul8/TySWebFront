import { Injectable } from '@angular/core';

import { serverHost, serverPort } from '../../app.properties';

const socketUrl = `ws://${serverHost}:${serverPort}/wsGames`;

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private gameAndChatSocket: WebSocket | undefined;

  constructor() { }

  initWebSocket(gameMsgHandler: (data: any) => void, chatMsgHandler: (data: any) => void) {
    const sessionId = sessionStorage.getItem("session_id");
    const url = sessionId ? `${socketUrl}?httpSessionId=${sessionId}` : socketUrl;

    this.gameAndChatSocket = new WebSocket(url);

    this.gameAndChatSocket.onopen = (event) => {
      console.log('Conexión WebSocket abierta:', event);
    };

    this.gameAndChatSocket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log('Mensaje recibido:', data);

      if (data.tipo === 'MENSAJE PRIVADO') {
        // Manejar mensajes de chat
        chatMsgHandler(data);
      } else {
        // Manejar mensajes de juegos
        gameMsgHandler(data);
      }
    };

    this.gameAndChatSocket.onclose = (event) => {
      console.log('Conexión WebSocket cerrada:', event);
    };

    this.gameAndChatSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
  }

  sendGameMessage(message: any): void {
    if (this.gameAndChatSocket && this.gameAndChatSocket.readyState === WebSocket.OPEN) {
      this.gameAndChatSocket.send(JSON.stringify(message));
    } else {
      console.error('La conexión WebSocket no está abierta.');
    }
  }

  sendChatMessage(message: any): void {
    // Puedes usar la misma función sendGameMessage para enviar mensajes de chat
    this.sendGameMessage(message);
  }
}
