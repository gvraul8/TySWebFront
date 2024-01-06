import { Component, OnInit } from '@angular/core';
import { RayaService } from '../services/juegos/raya.service';
import { Raya } from '../raya/raya';
import { WsService } from '../services/ws/ws.service';
import { Tablero4R } from '../services/juegos/rayaResponse';
import { ChatComponent } from '../chat/chat.component';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raya',
  templateUrl: './raya.component.html',
  styleUrls: ['./raya.component.css']
})
export class RayaComponent implements OnInit {
  partida: Tablero4R;
  idPartida: string = '';
  estado: string = 'buscando';
  endGame: boolean = false;
  abandonedGame: boolean = false;
  wsService: WsService = new WsService;
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;

  constructor(private router: Router, private rayaService: RayaService) {
    this.partida = new Raya({
      players: [],
      meToca: false,
      id: '',
      ganador: false,
      empate: false,
      casillas: []
    });

    // Asignación de la función de flecha a eventsHandler
    this.eventsHandler = this.eventsHandler.bind(this);
  }

  ngOnInit() {
    this.iniciarPartida();
  }

  columnaHover: number | null = null;

  // Método para establecer la columna con hover
  setColumnHover(col: number) {
    this.columnaHover = col;
  }

  // Método para reiniciar la columna con hover cuando se deja de hacer hover
  cleanColumnHover() {
    this.columnaHover = null;
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
        sessionStorage.setItem('session_id', response.httpSessionId);
        console.log('session_id GUARDADO despues de crear la partida:', sessionStorage.getItem('session_id'));
        this.wsService.initWebSocket(this.eventsHandler, this.chatComponent.handleMessage.bind(this.chatComponent));


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
      console.log(data);
      this.jugar(data);
    }
    else if (data.tipo == "MOVEMENT") {
      console.log("Movimiento recibido");
      this.actualizarMovimiento(data);
    }
    else if (data.tipo == "MATCH_END") {
      this.endGame = true;
      console.log("Partida terminada");
      this.actualizarMovimiento(data);
      this.partida.empate = data.empate;
      this.partida.ganador = data.ganador;
      if (this.partida.empate) {
        console.log("Empate");
      } else if (this.partida.ganador) {
        console.log("Ganador:", this.partida.ganador);
      }
    }
    else if (data.tipo == "ABANDONED") {
      console.log("Partida abandonada");
      this.endGame = true;
      this.actualizarMovimiento(data);
      this.partida.ganador = data.ganador;
      this.abandonedGame = true;
      console.log("abandonedGame:", this.abandonedGame);
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

  ponerFicha(columna: number) {
    if (this.estado === 'jugando' && this.partida.meToca) {
      console.log('Poniendo ficha en columna:', columna);
      this.rayaService.ponerFicha(this.idPartida, columna).subscribe(
        (response) => {
          console.log('Ficha colocada:', response);
        },
        (error) => {
          console.error('Error al colocar la ficha:', error);
        }
      );
    }
  }

  actualizarMovimiento(data: any) {
    this.partida.casillas = data.casillas;
    this.partida.meToca = data.meToca;
    console.log('this.partida después del movimiento:', this.partida);
  }

  volverAHome() {
    this.router.navigate(['/Home']);
  }
  

  // Envia un post despues de que el usuario pulse el boton de abandonar partida
  abandonarPartida() {
    if (this.estado === 'jugando' && this.idPartida) {
      this.rayaService.abandonarPartida(this.idPartida).subscribe(
        (response) => {
          console.log('Respuesta a solicitud de abandinar partida:', response);
        },
        (error) => {
          console.error('Error al abandonar la partida:', error);
        }
      );
    }
  }
}
