export interface RayaResponse {
    id: string;
    status: string;
}

export interface Tablero4R {
    players: Player[];
    meToca: boolean;
    id: string;
    ganador: boolean;
    empate: boolean;
    casillas: string[][];
}
  
export interface Player {
    id: string;
    name: string;
    pwd: string | null;
    email: string | null;
}
  