import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../services/weatherService/weather.service';

@Component({
  selector: 'app-players-data',
  templateUrl: './players-data.component.html',
  styleUrls: ['./players-data.component.css']
})
export class PlayersDataComponent implements OnChanges {
  @Input() playersData: any[] = [];
  player1: string = '';
  ciudad1: string = '';
  weather1: any;


  player2: string = '';
  ciudad2: string = '';
  weather2: any;

  dataLoaded: boolean = false;



  ngOnChanges(changes: SimpleChanges) {
    if (changes['playersData'] && this.playersData && !this.dataLoaded) {
      this.dataLoaded = true;
      this.obtenerInformacionJugador(this.playersData[0], 1);
      this.obtenerInformacionJugador(this.playersData[1], 2);
    }
  }

  async obtenerInformacionJugador(playerData: any, playerNumber: number) {
    if (playerNumber == 1) {
      this.player1 = playerData.name;
    } else {
      this.player2 = playerData.name;
    }

    if (playerData.lat == null || playerData.lon == null) {
      return;
    }

    let ciudad = '';
    let weather : any;

    try {
      console.log('playersData:', this.playersData);
      let lat1 = parseFloat(playerData.lat);
      let lon1 = parseFloat(playerData.lon);

      if (!isNaN(lat1) && !isNaN(lon1)) {
        // Llamar al método estático de WeatherService
        ciudad = await WeatherService.obtenerLaCiudad(lat1, lon1);
        weather = await WeatherService.obtenerElTiempo(lat1, lon1);        
      } else {
        console.error('Error al convertir latitud y/o longitud a números.');
      }
    } catch (error) {
      console.error('Error al obtener la información del jugador:', error);
    }


    if (playerNumber == 1) {
      this.ciudad1 = ciudad;
      this.weather1 = weather;
    } else {
      this.ciudad2 = ciudad;
      this.weather2 = weather;
    }
  }
}
