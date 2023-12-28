import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user/user';
//import { UserSService } from '../user-s.service';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    Nombre: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    Email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    Pwd1: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    Pwd2: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  usuario: User;
  respuestaOK: boolean;
  errorMessage: string = '';


  constructor(private userService: LoginService) {
    this.usuario = new User();
    this.respuestaOK = false;
  }

  onSubmit() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      if (this.registerForm.controls['Pwd1'].value !== this.registerForm.controls['Pwd2'].value) {
        // Contraseñas no coinciden
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.usuario.datosRegistro(
        this.registerForm.controls['Nombre'].value,
        this.registerForm.controls['Email'].value,
        this.registerForm.controls['Pwd1'].value,
        this.registerForm.controls['Pwd2'].value
      );

      this.userService.registrarUsuario(this.usuario).subscribe(
        (data) => {
          console.log('data');
          console.log(JSON.stringify(data));
          this.respuestaOK = true;
          console.log(this.respuestaOK);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

  bindeo() {
    console.log(this.registerForm.value);
  }
}
