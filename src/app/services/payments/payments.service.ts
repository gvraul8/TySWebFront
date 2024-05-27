import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverHost, serverPort } from 'src/app/app.properties';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiPaymentsURL = `http://${serverHost}:${serverPort}/payments`;
  constructor(private http: HttpClient) { }

  prepay(matches: number): Observable<Object> {
    return this.http.get(this.apiPaymentsURL + "/prepay?amount=" + matches, {
      withCredentials: true,
      observe: "response",
      responseType: "text"
    });
  }

  confirm(): Observable<any> {
    return this.http.get<any>(this.apiPaymentsURL  + "/confirm", {
      withCredentials: true,
      observe: "response"
    })
  }
}
