import { Player, Tablero4R } from '../services/juegos/rayaResponse';
export class Raya {
    players: Player[];
    meToca: boolean = false;
    id: string;
    ganador: Player | null;
    perdedor: Player | null;
    casillas: string[][];
  
    constructor(data: Tablero4R) {
      this.players = data.players || [];
      this.meToca = data.meToca || false;
      this.id = data.id || '';
      this.ganador = data.ganador || null;
      this.perdedor = data.perdedor || null;
      this.casillas = data.casillas || [];
    }
  }