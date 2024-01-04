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
    navigator.geolocation.getCurrentPosition(
      position => {
        this.position = position;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        console.log("latitud: " + this.latitude);
        this.obtenerLaCiudad(this.latitude, this.longitude);
        this.obtenerElTiempo(this.latitude, this.longitude);
      },
      error => {
        console.log("Error al obtener la localización: " + error.message);
      },
    );
  }
  
  private obtenerElTiempo(latitude: number, longitude: number) {
    let self = this;
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}?unitGroup=metric&include=current&key=3NNWL6PC3V6FYPPPVD24TB9XH&contentType=json`;
  
    let req = new XMLHttpRequest();  

    req.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status >= 200 && this.status < 400) {
          console.log("Todo OK");
          let response = req.response;
          response = JSON.parse(response);
          self.TemperaturaMax = response.days[0].tempmax;
          console.log("TempMax: " + response.days[0].tempmax);
          self.TemperaturaMin = response.days[0].tempmin;
        } else {
          console.log("Error de petición");
        }
      }
    }

    req.open("GET", url);
    req.send();
  }

  private obtenerLaCiudad(latitude: number, longitude: number) {
    console.log("PRUEBAAAAA:" + latitude)
    console.log("PRUEBAAAAA:" + longitude)

    let url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        if (req.status >= 200 && req.status < 400) {
          console.log("Todo OK")
          let response = req.response;
          response = JSON.parse(response);
          this.ciudad = response.display_name;
          console.log("Ciudad: " + this.ciudad);
          console.log(response);
        } else {
          console.log("Error de petición")
        }
      }
    }

    req.open("GET", url);
    req.send();
  }
}