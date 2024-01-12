export interface JuegosResponse {
    id: string;
    status: string;
    httpSessionId: string;
}

export interface Tablero4R {
    players: Player[];
    meToca: boolean;
    id: string;
    ganador: boolean;
    empate: boolean;
    casillas: string[][];
}

export interface TableroHundirFlota {
    players: Player[];
    meToca: boolean;
    id: string;
    ganador: boolean;
    empate: boolean;
    casillas: string[][];
    barcosHundidosJugador1: number;
    barcosHundidosJugador2: number;
    movimientosRestantesJugador1: number ;
    movimientosRestantesJugador2: number;
    barcosRestantes: number ;
}
  
export interface Player {
    id: string;
    name: string;
    pwd: string | null;
    email: string | null;
}
  