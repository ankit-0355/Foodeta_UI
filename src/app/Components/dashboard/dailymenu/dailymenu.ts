import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-dailymenu',
  imports: [],
  templateUrl: './dailymenu.html',
  styleUrl: './dailymenu.css',
})
export class Dailymenu {
  http = inject(HttpClient);
  editMenu = signal(false)
  items = signal<any>([]);

  ngOnInit() {
    const url="http://127.0.0.1:8080/dashboard/menu/1"
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const temp = res['items']
        this.items.set(temp)
        console.log(temp)
        console.log(res)
        
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      }
    });
  }

  toggleEdit() {
    this.editMenu.update(v => !v);
  }

}
