import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  constructor(private http: HttpClient) {}

  callApi() {
    return this.http.get('http://127.0.0.1:8000/database');
      // .subscribe({
      //   next: (res) => console.log('API Response:', res["Database response"][0]["id"]),
      //   error: (err) => console.error('Error:', err),
      //   complete: () => console.log('API call completed')
      // });

      // return ans;
  }
}
