import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  position?: GeolocationPosition;
  latitude?: number;
  longitude?: number;
  TemperaturaMax?: number;
  TemperaturaMin?: number;
  ciudad?: string;

  showModal: boolean = false;

  constructor(private router: Router) {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goToPayment() {
    this.closeModal();
    this.router.navigate(['/payments']);
  }
  

}