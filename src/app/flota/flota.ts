import { Player, TableroHundirFlota } from '../services/juegos/juegosResponse';

export class Flota {
    players: Player[];
    meToca: boolean = false;
    id: string;
    ganador: boolean = false;
    empate: boolean = false;
    casillas: string[][];
    barcosHundidosJugador1: number = 0;
    barcosHundidosJugador2: number = 0;
    movimientosRestantesJugador1: number = 0;
    movimientosRestantesJugador2: number = 0;
    barcosRestantes: number = 10;
  
    constructor(data: TableroHundirFlota) {
      this.players = data.players || [];
      this.meToca = data.meToca || false;
      this.id = data.id || '';
      this.ganador = data.ganador || false;
      this.empate = data.empate || false;
      this.casillas = data.casillas || [];
      this.barcosHundidosJugador1 = data.barcosHundidosJugador1 || 0;
      this.barcosHundidosJugador2 = data.barcosHundidosJugador2 || 0;
      this.movimientosRestantesJugador1 = data.movimientosRestantesJugador1 || 0;
      this.movimientosRestantesJugador2 = data.movimientosRestantesJugador2 || 0;
      this.barcosRestantes = data.barcosRestantes || 10;
    }
  }