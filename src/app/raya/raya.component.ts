import { Component, OnInit } from '@angular/core';
import { RayaService } from '../services/juegos/raya.service';
import { Raya } from '../raya/raya';
import { WsService } from '../services/ws/ws.service';
import { Tablero4R } from '../services/juegos/rayaResponse';

@Component({
  selector: 'app-raya',
  templateUrl: './raya.component.html',
  styleUrls: ['./raya.component.css']
})
export class RayaComponent implements OnInit {
  partida: Tablero4R;
  idPartida: string = '';
  estado: string = 'buscando';
  wsService: WsService = new WsService;

  constructor(private rayaService: RayaService) {
    this.partida = new Raya({
      players: [],
      meToca: false,
      id: '',
      ganador: null,
      perdedor: null,
      casillas: []
    });

    // Asignación de la función de flecha a eventsHandler
    this.eventsHandler = this.eventsHandler.bind(this);
  }

  ngOnInit() {
    this.iniciarPartida();
  }

  getClaseCasilla(valor: string): string {
    switch (valor) {
      case 'R':
        return 'rojo';
      case 'A':
        return 'azul';
      case 'D':
        return 'blanco';
      default:
        return '';
    }
  }

  // Manejador del botón de iniciar partida. Envía una petición al servidor para iniciar una partida
  // y inicializa la conexión WebSocket con el servidor
  iniciarPartida() {
    this.rayaService.iniciarPartida().subscribe(
      (response) => {
        console.log('Partida iniciada:', response);
        this.estado = 'buscando';
        this.idPartida = response.id;

        // Iniciar conexión ws con el servidor cuando la partida se ha creado correctamente
        this.wsService.initWebSocket(this.eventsHandler);

        // Si la partida ya está lista, con dos jugadores, se puede empezar a jugar
        if (response.status == 'READY') {
          this.rayaService.play(this.idPartida);
        } else {
          console.log('Esperando a que se una otro jugador...');
        }
      },
      (error) => {
        console.error('Error al iniciar la partida:', error);
      }
    );
  }

  // Manejador de eventos del WebSocket para la partida de 4 en raya
  eventsHandler(data: any) {
    if (data.tipo == "START") {
      console.log("Nueva partida lista");
      this.jugar(data);
    }
  }

  // Manejador del evento ws de nueva partida. Se recibe este mensaje cuando el servidor ha encontrado a 
  // un segundo jugador
  jugar(data: any) {
    this.estado = 'jugando';
    console.log('Jugando partida:', data);
    this.partida = new Raya(data);

    console.log('this.partida:', this.partida);

  }
}
