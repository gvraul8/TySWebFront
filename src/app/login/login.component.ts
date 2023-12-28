import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { LoginRequest } from '../services/auth/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    pwd: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('LoginComponent.onSubmit():', this.loginForm.value);
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe(
        (user) => {
          console.log('Login exitoso. Usuario:', user);

          this.router.navigate(['/']); 
        },
        (error) => {
          console.error('Login error:', error);
          if (error.status === 403) {
            this.errorMessage = 'Combinación usuario/contraseña inválida';
            this.loginForm.patchValue({ pwd: '' });
          } else {
            this.errorMessage = 'Error en el inicio de sesión';
          }
        }
      );
    }
  }
}
