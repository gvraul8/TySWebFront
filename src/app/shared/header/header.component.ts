import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.loginService.currentUserData.subscribe((data) => {
      console.log('Valor de data:', data)
      console.log('Valor de data.nombre:', data.nombre)
      this.username = data.nombre;
      console.log('Valor de this.username:', this.username)

      this.llamarServicioEstadisticas(data.id);

    });
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.currentUserData.next(new User());
    this.loginService.currentUserLoginOn.next(false);
    sessionStorage.removeItem('session_id');
  }

  private llamarServicioEstadisticas(idUsuario: string) {
    // Llamar al servicio de estadísticas
    this.loginService.obtenerEstadisticasUsuario(idUsuario).subscribe(
      (data) => {
        console.log('Datos de estadísticas recibidos en AppComponent:', data);
        // Puedes hacer algo con los datos recibidos si es necesario
      },
      (error) => {
        console.error('Error al obtener estadísticas en AppComponent:', error);
      }
    );
  }
}
