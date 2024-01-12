import { Component, OnInit } from '@angular/core';
import { HundirFlotaService } from '../services/juegos/flota.service';
import { Flota } from './flota';
import { WsService } from '../services/ws/ws.service';
import { WsChat } from '../services/wsChat/wsChat.service';
import { TableroHundirFlota } from '../services/juegos/juegosResponse';
import { ChatComponent } from '../shared/chat/chat.component';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flota',
  templateUrl: './flota.component.html',
  styleUrls: ['./flota.component.css']
})
export class FlotaComponent implements OnInit {
  partida: TableroHundirFlota;
  idPartida: string = '';
  estado: string = 'buscando';
  endGame: boolean = false;
  abandonedGame: boolean = false;
  wsService: WsService = new WsService;
  wsChat: WsChat = new WsChat;

  playersData: string[] = [];

  @ViewChild(ChatComponent) chatComponent!: ChatComponent;

  constructor(private router: Router, private flotaService: HundirFlotaService) {
    this.partida = new Flota({
      players: [],
      meToca: false,
      id: '',
      ganador: false,
      empate: false,
      casillas: [], 
      barcosHundidosJugador1: 0,
      barcosHundidosJugador2: 0,
      movimientosRestantesJugador1: 0,
      movimientosRestantesJugador2: 0,
      barcosRestantes: 10
    });

    // Asignación de la función de flecha a eventsHandler
    this.eventsHandler = this.eventsHandler.bind(this);

   
  }

  ngOnInit() {
    this.obtenerLocalizacion()
      .then(coords => {
        // coords contiene la latitud y longitud
        this.iniciarPartida(coords.latitud, coords.longitud);
      })
      .catch(error => {
        console.log("Error al obtener la localización: " + error.message);
        // En caso de error, iniciar la partida con valores predeterminados o nulos
        this.iniciarPartida("", "");
      });
  }

  private obtenerLocalizacion(): Promise<{ latitud: string, longitud: string }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const latitud = lat.toString();
          const longitud = lon.toString();
          resolve({ latitud, longitud });
        },
        error => {
          reject(error);
        }
      );
    });
  }

  columnaHover: number | null = null;

  // Método para establecer la columna con hover
  setColumnHover(col: number, fila: number) {
    this.columnaHover = col;
  }

  // Método para reiniciar la columna con hover cuando se deja de hacer hover
  cleanColumnHover() {
    this.columnaHover = null;
  }

  getClaseCasilla(valor: string): string {
    switch (valor) {
        case 'A':
            return 'azul marcar'; // Jugador actual tocó agua
        case 'O':
            return 'azul agua'; // Jugador actual tocó su propio barco
        case 'R':
            return 'rojo marcar'; // Otro jugador tocó agua
        case 'F':
            return 'rojo agua'; // Otro jugador tocó su barco
        default:
            return '';
    }
}

  

  // Manejador del botón de iniciar partida. Envía una petición al servidor para iniciar una partida
  // y inicializa la conexión WebSocket con el servidor
  iniciarPartida(latitud: string, longitud: string) {
    this.flotaService.iniciarPartida(latitud, longitud).subscribe(
      (response) => {
        console.log('Partida iniciada:', response);
        this.estado = 'buscando';
        this.idPartida = response.id;

        // Iniciar conexión ws con el servidor cuando la partida se ha creado correctamente
        sessionStorage.setItem('session_id', response.httpSessionId);
        console.log('session_id GUARDADO despues de crear la partida:', sessionStorage.getItem('session_id'));
        this.wsService.initWebSocket(this.eventsHandler);
        this.wsChat.initChatWebSocket(this.chatComponent.handleMessage.bind(this.chatComponent));


        // Si la partida ya está lista, con dos jugadores, se puede empezar a jugar
        if (response.status == 'READY') {
          this.flotaService.play(this.idPartida);
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
      this.playersData = data.players;

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
    this.partida = new Flota(data);
    
    console.log('this.partida:', this.partida);
  }

  ponerFicha(columna: number, fila: number) {
    if (this.estado === 'jugando' && this.partida.meToca) {
      const valorActual = this.partida.casillas[fila][columna];
      const nuevoValor = valorActual === '·' ? 'X' : '·';
  
      this.partida.casillas[fila][columna] = nuevoValor;
      console.log('Poniendo ficha en columna:', columna);
      this.flotaService.ponerFicha(this.idPartida, columna, fila).subscribe(
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
    this.partida.barcosHundidosJugador1 = data.barcosHundidosJugador1;
    this.partida.barcosHundidosJugador2 = data.barcosHundidosJugador2;
    this.partida.movimientosRestantesJugador1 = data.movimientosRestantesJugador1;
    this.partida.movimientosRestantesJugador2 = data.movimientosRestantesJugador2;
    this.partida.barcosRestantes = data.barcosRestantes;
    console.log('this.partida después del movimiento:', this.partida);
  }

  volverAHome() {
    this.router.navigate(['/Home']);
  }
  

  // Envia un post despues de que el usuario pulse el boton de abandonar partida
  abandonarPartida() {
    if (this.estado === 'jugando' && this.idPartida) {
      this.flotaService.abandonarPartida(this.idPartida).subscribe(
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
