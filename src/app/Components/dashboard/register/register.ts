import { Component, inject, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RegistrationData } from '../../../model/models';
import { form, Field } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [MatIcon, Field],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  http = inject(HttpClient);
  router = inject(Router);
  snackbar = inject(MatSnackBar);
  primary_location = [ 'Toronto, ON', 'Windsor, ON'];
  delivery_areas = [ 'Toronto', 'Windsor' ];

// toggleDeliveryArea(area: string, checked: boolean) {
//   this.rData.update(data => ({
//     ...data,
//     delivery_areas: checked
//       ? [...data.delivery_areas, area]
//       : data.delivery_areas.filter(a => a !== area),
//   }));
// }

// isSelected(area: string): boolean {
//   return this.rData().delivery_areas.includes(area);
// }

  rData = signal<RegistrationData>({
    business_name: '',
    owner_name: '',
    phone_number: '',
    email: '',
    password: '',
    address: '',
    description: '',
    image_url: ''
  });

  rform = form(this.rData);

  onSubmit() {
    console.log('Registration Data:', this.rData());
    // const url="https://foddeta-backend-1030483456536.northamerica-northeast2.run.app/register"
    const url=`${environment.baseUrl}/register`
    this.http.post(url, this.rData())
    .pipe()
    .subscribe({
            next: (res) => {
              this.snackbar.open('Registration successful!', 'OK', { 
                duration: 3000 
              });
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
              console.log('Order placed successfully:', res);
            },
            error: (err) => {
              console.error('Order placement failed:', err);
            }
          });
  }

}
