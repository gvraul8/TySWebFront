import { Component, OnInit } from '@angular/core';
import { WsService } from '../services/ws/ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  isConnected: boolean = false;

  constructor(private wsService: WsService) {}

  ngOnInit(): void {
      // Inicia la conexión WebSocket para el chat
      this.wsService.initWebSocket(this.handleMessage.bind(this), this.handleMessage.bind(this));
      this.isConnected = true;
  }

  handleMessage(data: any) {
      // Maneja los mensajes del servidor WebSocket para el chat
      if (data.tipo === 'MENSAJE CHAT') {
          this.messages.push(data);
      }
      // ... (otro manejo de mensajes según sea necesario)
  }

  sendMessage() {
      // Envia un mensaje al servidor WebSocket para el chat
      if (this.newMessage.trim() !== '') {
          const message = { tipo: 'MENSAJE CHAT', destinatario: this.newMessage };
          
          this.wsService.sendChatMessage(message);
          this.newMessage = '';
      }
  }
}
