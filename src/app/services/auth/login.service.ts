import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLoginURL = 'http://localhost:8080/users/login';

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
    return this.client.post<any>('http://localhost:8080/users/register', info)
  } 

  login(credentials: LoginRequest): Observable<User> {
    return this.client.put<User>(this.apiLoginURL, credentials).pipe(
      tap(
        (data: User) => {
          console.log('LoginService.login():', data);
          this.currentUserData.next(data);
          this.currentUserLoginOn.next(true);
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
