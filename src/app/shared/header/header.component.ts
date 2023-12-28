import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.currentUserData.next(new User());
    this.loginService.currentUserLoginOn.next(false);
  }
}
