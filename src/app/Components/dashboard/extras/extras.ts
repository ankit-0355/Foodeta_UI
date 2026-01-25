import { Component, inject, signal } from '@angular/core';
import { extraItem } from '../../../model/models';
import { form, Field } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-extras',
  imports: [Field, DecimalPipe],
  templateUrl: './extras.html',
  styleUrl: './extras.css',
})
export class Extras {
http = inject(HttpClient)
editExtra =signal(false)
items = signal<any>([]);
unit = ['gram','piece','oz',"ml"]
userid =signal(Number(localStorage.getItem('businessid')));
extraItem = signal<extraItem>({
  name:'',
  price:NaN,
  qty:NaN,
  unit:''
})

extraItemform = form(this.extraItem)

ngOnInit() {
  // const userid =signal(Number(localStorage.getItem('businessid')));
  const url = `${environment.baseUrl}/dashboard/extra/${this.userid()}`;
  this.http.get(url).subscribe({
    next : (res) => {
      this.items.set(res)
      // console.log(this.items())
    }
  });
}

toggleEditExtra() {
  this.editExtra.update(v => !v)
}

addExtraItem() {
  this.items.update(v => [...v, this.extraItem()]);
  this.extraItem.set({
    name:'',
  price:NaN,
  qty:NaN,
  unit:''
  })
  // console.log(this.items())
}

saveExtraItem() {
  const url =  `${environment.baseUrl}/dashboard/extra/${this.userid()}`
  this.http.put(url, this.items()).subscribe({
    next: (res) => {
      // console.log("Data sent:", this.items())
    },
    error: (err) => {
      console.log("Error:", err)
    }
  })
  this.toggleEditExtra()
}

removeExtraItem(item: extraItem) {
    this.items.update(currentvalue => {
      return currentvalue.filter((existing: extraItem) => existing !== item)
    });
    const url = `${environment.baseUrl}/dashboard/extra/${this.userid()}`
    this.http.put(url, this.items()).subscribe({
      next: (res) => {
        // console.log("Data sent:", this.items())
      },
      error: (err) => {
        console.log("Error:", err)
      }
    })
    // console.log("updated item:", this.items())
  }


}
