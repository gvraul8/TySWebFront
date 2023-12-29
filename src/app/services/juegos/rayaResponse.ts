export interface RayaResponse {
    players: Player[];
    jugadorConElTurno: Player | null;
    id: string;
    ganador: Player | null;
    perdedor: Player | null;
    casillas: string[][];
}
  
export interface Player {
    id: string;
    name: string;
    pwd: string | null;
    email: string | null;
}
  