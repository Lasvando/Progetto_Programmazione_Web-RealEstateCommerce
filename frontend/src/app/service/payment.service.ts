import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(paypalTransactionId: any, propertyId: any) {
    return this.http.post(this.apiUrl + '/api/transaction', {
      paypalTransactionId,
      propertyId,
      userId: localStorage.getItem('userId'),
    });
  }

  find(propertyId: any) {
    return this.http.get(
      this.apiUrl + '/api/transaction/find-already-booked/' + propertyId
    );
  }
}
