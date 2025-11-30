import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiffinProvider } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Tiffins: Array<TiffinProvider> = [];

  constructor(private http: HttpClient) {
    this.callApi();
  }


  callApi() {
    return this.http.get<TiffinProvider[]>('http://127.0.0.1:8000/database');
  }

}
