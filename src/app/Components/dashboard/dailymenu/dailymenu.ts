import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { itemDesc } from '../../../model/models';
import { form, Field } from '@angular/forms/signals';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dailymenu',
  imports: [Field],
  templateUrl: './dailymenu.html',
  styleUrl: './dailymenu.css',
})
export class Dailymenu {
  http = inject(HttpClient);
  editMenu = signal(false)
  items = signal<any>([]);

  menuItem = signal<itemDesc>({
    name: '',
    description: ''
  });

  menuItemform = form(this.menuItem)

  ngOnInit() {
    const userid =signal(Number(localStorage.getItem('businessid')));
    const url=`${environment.baseUrl}/dashboard/menu/${userid()}`
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.items.set(res['items'])
        // console.log()
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      }
    });
  }

  toggleEdit() {
    this.editMenu.update(v => !v);
  }

  saveMenu() {
    const url = "http://127.0.0.1:8080/dashboard/menu/1"
    this.http.put(url, this.items()).subscribe({
      next: (res) => {
        console.log("Data sent:", this.items())
      },
      error: (err) => {
        console.log("Error:", err)
      }
    })
    console.log(this.menuItem());
    this.toggleEdit();
  }

  addMenuItem() {
    this.items.update(v => [...v, this.menuItem()]);
    this.menuItem.set({
      name:'',
      description:''
    })
  }

  removeMenuItem(item: itemDesc) {
    this.items.update(currentvalue => {
      return currentvalue.filter((existing: itemDesc) => existing !== item)
    });
    const url = "http://127.0.0.1:8080/dashboard/menu/1"
    this.http.put(url, this.items()).subscribe({
      next: (res) => {
        console.log("Data sent:", this.items())
      },
      error: (err) => {
        console.log("Error:", err)
      }
    })
    console.log("updated item:", this.items())
  }
}
