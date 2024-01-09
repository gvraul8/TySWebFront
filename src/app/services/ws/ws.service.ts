import { Injectable } from '@angular/core';

import { serverHost, serverPort } from '../../app.properties';

const socketUrl = `ws://${serverHost}:${serverPort}/wsGames`;

@Injectable({
  providedIn: 'root',
})
export class WsService {
  private gameAndChatSocket: WebSocket | undefined;
  wsConnected: boolean = false;

  constructor() {}

  initWebSocket(
    gameMsgHandler: (data: any) => void,
    // chatMsgHandler: (data: any) => void
  ) {
    if (this.wsConnected) {
      console.log('Conexión WebSocket ya está abierta.');
      return;
    }
    console.log('INICIANDO CONEXIÓN WEBSOCKET');
    const sessionId = sessionStorage.getItem('session_id');
    const url = sessionId
      ? `${socketUrl}?httpSessionId=${sessionId}`
      : socketUrl;
    console.log('url' + url);

    this.gameAndChatSocket = new WebSocket(url);

    this.gameAndChatSocket.onopen = (event) => {
      console.log('Conexión WebSocket abierta:', event);
      this.wsConnected = true;
    };

    this.gameAndChatSocket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log('Mensaje recibido:', data);

      if (data.tipo === 'MENSAJE PRIVADO') {
        // Manejar mensajes de chat
        // chatMsgHandler(data);
      } else {
        // Manejar mensajes de juegos
        gameMsgHandler(data);
      }
    };

    // setTimeout(() => {
    //   // Ahora es seguro enviar mensajes
    //   let message = "aaaaaaaaaa"
    //   this.sendChatMessage(message);
    //   console.log("mensaje enviado " + message )
    // }, 1000);

    this.gameAndChatSocket.onclose = (event) => {
      console.log('Conexión WebSocket cerrada:', event);
      this.wsConnected = false;
    };

    this.gameAndChatSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
      this.wsConnected = false;
    };
  }

  sendGameMessage(message: any): void {
    if (
      this.gameAndChatSocket &&
      this.gameAndChatSocket.readyState === WebSocket.OPEN
    ) {
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
