import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/juegos/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  isConnected: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Inicia la conexión WebSocket para el chat
    //this.wsService.initWebSocket(this.handleMessage.bind(this), this.handleMessage.bind(this));
    this.isConnected = true;
  }

  handleMessage(data: any) {
    // Maneja los mensajes del servidor WebSocket para el chat
    if (data.tipo === 'MENSAJE CHAT') {
      this.messages.push(data);
      console.log(this.messages)
    }
    console.log('Mensaje de chat manejado:', data);
    // ... (otro manejo de mensajes según sea necesario)
  }

  sendMessage() {
    // Envia un mensaje al servidor WebSocket para el chat
    if (this.newMessage.trim() !== '') {
      //const message = { user: 'Pepe', msg: this.newMessage };

      this.chatService.enviarMensajeChat('Pepe', this.newMessage).subscribe(
        (response) => {
          console.log('Mensaje enviado correctamente');
        },
        (error) => {
          console.error('Error al enviar el mensaje: ', error);
        }
      );

    //   this.chatService.enviarMensajeChat('Pepe', this.newMessage);
      this.newMessage = '';

      //   this.chatService.ponerFicha('01f269a2-b052-4ac0-9679-0291f4a76412', 2)
      //   this.newMessage = '';
    }
    //this.wsChat.sendChatMessage('Hola, mundo!');
  }
}
