/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSService {

  constructor(private client: HttpClient) { 

  }

  registrarUsuario(usuario: user): Observable<undefined> {
    let info = {
      nombre: usuario.nombre,
      email: usuario.email,
      pwd1: usuario.pwd1,
      pwd2: usuario.pwd2
    }

    console.log('Valor de info:', info);
    return this.client.post<any>('http://localhost:8080/users/register', info)

  }
}
*/