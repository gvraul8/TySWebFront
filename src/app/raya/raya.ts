import { Player, Tablero4R } from '../services/juegos/rayaResponse';
export class Raya {
    players: Player[];
    meToca: boolean = false;
    id: string;
    ganador: boolean = false;
    empate: boolean = false;
    casillas: string[][];
  
    constructor(data: Tablero4R) {
      this.players = data.players || [];
      this.meToca = data.meToca || false;
      this.id = data.id || '';
      this.ganador = data.ganador || false;
      this.empate = data.empate || false;
      this.casillas = data.casillas || [];
    }
  }