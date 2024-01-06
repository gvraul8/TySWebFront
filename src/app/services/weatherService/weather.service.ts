import { Injectable } from '@angular/core';
import { Weather } from '../../models/weather/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  static obtenerElTiempo(latitude: number, longitude: number): Promise<Weather> {
    return new Promise((resolve, reject) => {
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}?unitGroup=metric&include=current&key=3NNWL6PC3V6FYPPPVD24TB9XH&contentType=json`;

      let req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status >= 200 && this.status < 400) {
            let response = req.response;
            response = JSON.parse(response);

            let weather = new Weather(response.days[0].tempmax, response.days[0].tempmin, '' );
            resolve(weather);
          } else {
            reject("Error de petición");
          }
        }
      }

      req.open("GET", url);
      req.send();
    });
  }

  static obtenerLaCiudad(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      let req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status >= 200 && req.status < 400) {
            let response = req.response;
            response = JSON.parse(response);

            let city = ''; 
            let state = '';
            let country = '';

            if (response.address.village) {
              city = response.address.village;
            } else if (response.address.town) {
              city = response.address.town;
            } else if (response.address.city) {
              city = response.address.city;
            } 
            state = response.address.state;
            country = response.address.country;
            resolve(`${city}, ${state}, ${country}`);            
          } else {
            reject("Error de petición");
          }
        }
      }

      req.open("GET", url);
      req.send();
    });
  }
}
