import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from './authRequest';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { serverHost, serverPort } from '../../app.properties';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLoginURL = `http://${serverHost}:${serverPort}/users/login`;
  private apiRegisterURL = `http://${serverHost}:${serverPort}/users/register`;
  private apiStatisticsURL = `http://${serverHost}:${serverPort}/users/statistics`;



  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  currentUserStatistics: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private client: HttpClient) { }
  
  registrarUsuario(credentials: RegisterRequest): Observable<any> {
    console.log('LoginService.registrarUsuario():', credentials);
    return this.client.post(this.apiRegisterURL, credentials, { withCredentials: true }).pipe(
      tap(
        (error) => {
          console.error('LoginService.registrarUsuario() error:', error);
        }
      )
    );
  } 

  login(credentials: LoginRequest): Observable<any> {
    return this.client.put(this.apiLoginURL, credentials, {withCredentials: true}).pipe(
      tap(
        (data: any) => {
          console.log('LoginService.login():', data);
          this.currentUserData.next(data);
          this.currentUserLoginOn.next(true);

          this.obtenerEstadisticasUsuario(data.id);

          // almacenar el id de sesión en el sessionStorage
          sessionStorage.setItem('session_id', data.httpId);
        },
        (error) => {
          console.error('LoginService.login() error:', error);
        }
      )
    );
  }

  get userData(): Observable<User> {
    console.log('Valor de this.currentUserData:', this.currentUserData);
    return this.currentUserData.asObservable();
  }

  obtenerEstadisticasUsuario(idUsuario: string): Observable<any> {
    console.log("---------------------------------------------------");
    const url = `${this.apiStatisticsURL}?idUsuario=${idUsuario}`;

    console.log('----- StatisticsService.obtenerEstadisticasUsuario():', url);
    
    return this.client.get(url, { withCredentials: true }).pipe(
      tap(
        (data: any) => {
          console.log('------ StatisticsService.obtenerEstadisticasUsuario():', data);
          this.currentUserStatistics.next(data);
        },
        (error) => {
          console.error('StatisticsService.obtenerEstadisticasUsuario() error:', error);
        }
      )
    );
  }

}
