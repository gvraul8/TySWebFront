import { RayaResponse, Player } from '../services/juegos/rayaResponse';
export class Raya {
    players: Player[];
    jugadorConElTurno: Player | null;
    id: string;
    ganador: Player | null;
    perdedor: Player | null;
    casillas: string[][];
  
    constructor(data: RayaResponse) {
      this.players = data.players || [];
      this.jugadorConElTurno = data.jugadorConElTurno || null;
      this.id = data.id || '';
      this.ganador = data.ganador || null;
      this.perdedor = data.perdedor || null;
      this.casillas = data.casillas || [];
    }
  }