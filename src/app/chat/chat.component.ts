import { Component, OnInit } from '@angular/core';
import { WsService } from '../services/ws/ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  isConnected: boolean = false;


  constructor(private wsService: WsService) {}

  ngOnInit(): void {
    this.wsService.initWebSocket(this.handleMessage.bind(this));
  }

  initChatWebSocket() {
    this.isConnected = true;
    console.log('Chat connected');
  }

  handleMessage(data: any) {
    this.messages.push(data);
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message = { tipo: 'MENSAJE PRIVADO', texto: this.newMessage, destinatario: 'destinatario' };
      this.wsService.send(message);
      this.newMessage = '';
    }
  }
}
