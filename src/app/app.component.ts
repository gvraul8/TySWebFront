import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoPruebas';
  position? : GeolocationPosition;
  TemperaturaMax? : number;
  TemperaturaMin? : number;
  ciudad? : String; 


  constructor() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.position = position;
        console.log(position);
        console.log("latitud: "+position.coords.latitude);
      },
      error => {
        console.log("Error")
      }, 
    );
    this.obtenerElTiempo();
    this.obtenerLaCiudad();
  }

  private obtenerElTiempo() {
    let self = this;
    // Hacer fichero de propiedades y meter la API key
    console.log("PRUEBAAAAA:"+this.position?.coords.latitude)
    let url="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/37.5442706%2C%2037.5442706?unitGroup=metric&include=current&key=3NNWL6PC3V6FYPPPVD24TB9XH&contentType=json";

    //let url="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.position?.coords.latitude+"%2C%20"+this.position?.coords.altitude+"?unitGroup=metric&include=current&key=3NNWL6PC3V6FYPPPVD24TB9XH&contentType=json";
    let req = new XMLHttpRequest(); 
    
    req.onreadystatechange = function() {
      if(this.readyState == 4){
        if(this.status >= 200 && this.status<400) {
          console.log("Todo OK")
          let response = req.response
          response = JSON.parse(response)
          self.TemperaturaMax = response.days[0].tempmax
          console.log("TempMax: "+ response.days[0].tempmax)
          self.TemperaturaMin = response.days[0].tempmin

        } else {
          console.log("Error de petición")
        }
      }
    }

    req.open("GET", url);
    req.send()
  }


  private obtenerLaCiudad() {
    let self = this;
    // Hacer fichero de propiedades y meter la API key
    // QUITAR EL VALOR DE LATITUD Y LONGITUD Y PONERLO CON VARIABLES 
    console.log("PRUEBAAAAA:"+this.position?.coords.latitude)
    let url="https://nominatim.openstreetmap.org/reverse?lat=38.98626&lon=-3.92907&format=json";
    let req = new XMLHttpRequest(); 
    
    req.onreadystatechange = function() {
      if(this.readyState == 4){
        if(this.status >= 200 && this.status<400) {
          console.log("Todo OK")
          let response = req.response
          response = JSON.parse(response)
          self.ciudad = response.address.city
          console.log("Ciudad: "+ self.ciudad)
        } else {
          console.log("Error de petición")
        }
      }
    }
    req.open("GET", url);
    req.send()
  }
}