import { Injectable } from '@angular/core';
import { serverHost, serverPort } from 'src/app/app.properties';

const chatSocketUrl = `ws://${serverHost}:${serverPort}/wsChat`;
const sendMessageChatUrl = `http://${serverHost}:${serverPort}/matches/sendMessageChat`;


@Injectable({
  providedIn: 'root',
})
export class WsChat {
  private chatSocket: WebSocket | undefined;
  chatConnected: boolean = false;

  constructor() {}

  initChatWebSocket(chatMsgHandler: (data: any) => void) {
    if (this.chatConnected) {
      console.log('Conexión WebSocket de chat ya está abierta.');
      return;
    }

    console.log('INICIANDO CONEXIÓN WEBSOCKET DE CHAT');
    const sessionId = sessionStorage.getItem('session_id');
    const url = sessionId
      ? `${chatSocketUrl}?httpSessionId=${sessionId}`
      : chatSocketUrl;
    console.log('url' + url);

    this.chatSocket = new WebSocket(url);

    this.chatSocket.onopen = (event) => {
      console.log('Conexión WebSocket de chat abierta:', event);
      this.chatConnected = true;
    };

    // setTimeout(() => {
    //     // Ahora es seguro enviar mensajes
    //     this.sendChatMessage("pruebaaaaaadifhaidsfajio");
    //     console.log("Mensaje enviado")
    //   }, 1000);

    this.chatSocket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log('Mensaje de chat recibido:', data);
      chatMsgHandler(data);
    };

    this.chatSocket.onclose = (event) => {
      console.log('Conexión WebSocket de chat cerrada:', event);
      this.chatConnected = false;
    };

    this.chatSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket de chat:', error);
      this.chatConnected = false;
    };
  }

  sendChatMessage(message: any): void {
    if (this.chatSocket && this.chatSocket.readyState === WebSocket.OPEN) {
      this.chatSocket.send(JSON.stringify(message));
      console.log("Mensaje", message)
    } else {
      console.error('La conexión WebSocket de chat no está abierta.');
    }
  }
}
