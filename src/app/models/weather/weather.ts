export class Weather {
    private temperaturaMax: number;
    private temperaturaMin: number;
    private ciudad: string;
  
    constructor(temperaturaMax: number, temperaturaMin: number, ciudad: string) {
      this.temperaturaMax = temperaturaMax;
      this.temperaturaMin = temperaturaMin;
      this.ciudad = ciudad;
    }
  
    get TemperaturaMax(): number {
      return this.temperaturaMax;
    }
  
    set TemperaturaMax(value: number) {
      this.temperaturaMax = value;
    }
  
    get TemperaturaMin(): number {
      return this.temperaturaMin;
    }
  
    set TemperaturaMin(value: number) {
      this.temperaturaMin = value;
    }
  
    get Ciudad(): string {
      return this.ciudad;
    }
  
    set Ciudad(value: string) {
      this.ciudad = value;
    }
  }
  