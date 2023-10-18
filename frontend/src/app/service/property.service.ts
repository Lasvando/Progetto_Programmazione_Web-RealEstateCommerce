import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Property } from '../models/Property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get<Property>(this.apiUrl + '/api/property/' + id);
  }

  getAll() {
    return this.http.get<Property[]>(this.apiUrl + '/api/property');
  }

  create(
    title: any,
    description: any,
    price: any,
    address: any,
    photos: File[]
  ) {
    let formData: FormData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('price', price);

    for (var i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }

    return this.http.post<Property>(this.apiUrl + '/api/property', formData);
  }
}
