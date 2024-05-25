import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  
  partidasJugadas: number = 0;
  partidasGanadas: number = 0;
  partidasPerdidas: number = 0;
  partidasEmpatadas: number = 0;
  porcentajeVictorias: number = 0;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.llamarServicioEstadisticas(this.loginService.currentUserData.getValue().id);
  }
  
  private llamarServicioEstadisticas(idUsuario: string) {
    this.loginService.obtenerEstadisticasUsuario(idUsuario).subscribe(
      (data) => {
        console.log('Datos de estadísticas recibidos en AppComponent:', data);
        this.partidasJugadas = data.partidasJugadas;
        this.partidasGanadas = data.partidasGanadas;
        this.partidasPerdidas = data.partidasPerdidas;
        this.partidasEmpatadas = data.partidasEmpatadas;
        this.porcentajeVictorias = data.partidasGanadas/data.partidasJugadas*100;
      },
      (error) => {
        console.error('Error al obtener estadísticas en AppComponent:', error);
      }
    );
  }

  volverAHome() {
    this.router.navigate(['/Home']);
  }
}
