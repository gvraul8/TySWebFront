import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/user/user';
import { serverHost, serverPort } from '../../app.properties';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLoginURL = `http://${serverHost}:${serverPort}/users/login`;
  private apiRegisterURL = `http://${serverHost}:${serverPort}/users/register`;


  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private client: HttpClient) { }
  
  registrarUsuario(usuario: User): Observable<User> {
    let info = {
      nombre: usuario.nombre,
      email: usuario.email,
      pwd1: usuario.pwd1,
      pwd2: usuario.pwd2
    }
    console.log('Valor de info:', info);
    return this.client.post<any>(this.apiRegisterURL, info)
  } 

  login(credentials: LoginRequest): Observable<any> {
    return this.client.put(this.apiLoginURL, credentials, {withCredentials: true}).pipe(
      tap(
        (data: any) => {
          console.log('LoginService.login():', data);
          this.currentUserData.next(data);
          this.currentUserLoginOn.next(true);


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
}
