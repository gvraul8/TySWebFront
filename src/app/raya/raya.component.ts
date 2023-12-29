import { Component, OnInit } from '@angular/core';
import { RayaService } from '../services/juegos/raya.service';
import { Raya } from '../raya/raya';

@Component({
  selector: 'app-raya',
  templateUrl: './raya.component.html',
  styleUrls: ['./raya.component.css']
})
export class RayaComponent implements OnInit {
  partida: Raya;

  casillas = [
    "DDDDDDD",
    "DDDDDDD",
    "DDDDDDD",
    "DDDDDDD",
    "DAAADDD",
    "RRRRDDD"
  ]

  constructor(private rayaService: RayaService) {
    this.partida = new Raya({
      players: [],
      jugadorConElTurno: null,
      id: '',
      ganador: null,
      perdedor: null,
      casillas: []
    });
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

  iniciarPartida() {
    this.rayaService.iniciarPartida().subscribe(
      (response) => {
        console.log('Partida iniciada:', response);
        this.partida = response;
        console.log('Casillas prueba:', this.casillas);
        console.log('Casillas:', this.partida.casillas);
        for (let i = 0; i < this.casillas.length; i++) {
          this.partida.casillas[i] = [];
          for (let j = 0; j < this.casillas[i].length; j++) {
            this.partida.casillas[i][j] = this.casillas[i][j];
          }
        }
        console.log('Casillas:', this.partida.casillas);
      },
      (error) => {
        console.error('Error al iniciar la partida:', error);
      }
    );
  }
  
}
