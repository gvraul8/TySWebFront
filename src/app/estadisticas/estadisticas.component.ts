import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/auth.service';

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

  // Puedes obtener las estadísticas del servicio o de donde sea necesario
  // Aquí asumimos que tienes un servicio llamado 'estadisticasService'

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.llamarServicioEstadisticas(this.loginService.currentUserData.getValue().id);
    // Llama a un método en tu servicio para obtener las estadísticas del usuario
    //this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    // Llama al servicio para obtener las estadísticas del usuario y actualiza las propiedades
    // Ejemplo: this.estadisticasService.obtenerEstadisticas().subscribe(estadisticas => { ... });
  }

  
  private llamarServicioEstadisticas(idUsuario: string) {
    // Llamar al servicio de estadísticas
    this.loginService.obtenerEstadisticasUsuario(idUsuario).subscribe(
      (data) => {
        console.log('Datos de estadísticas recibidos en AppComponent:', data);
        this.partidasJugadas = data.partidasJugadas;
        this.partidasGanadas = data.partidasGanadas;
        this.partidasPerdidas = data.partidasPerdidas;
        this.partidasEmpatadas = data.partidasEmpatadas;
        this.porcentajeVictorias = data.partidasGanadas/data.partidasJugadas*100;
        //this.porcentajeVictorias = data.porcentajeVictorias;
        // Puedes hacer algo con los datos recibidos si es necesario
      },
      (error) => {
        console.error('Error al obtener estadísticas en AppComponent:', error);
      }
    );
  }
}
