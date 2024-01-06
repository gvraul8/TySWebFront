import { Component } from '@angular/core';

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

  constructor() {

  }
  

}