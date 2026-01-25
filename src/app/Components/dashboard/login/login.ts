import { HttpClient } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import { form } from '@angular/forms/signals'
import { Field } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [Field, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  http = inject(HttpClient)
  loginsignal = signal({
    username: '',
    password: ''
  })

  loginform = form(this.loginsignal)

  loginSubmit() {
    const url = `${environment.baseUrl}/login`
    const Credentials = this.loginsignal()
    this.http.post(url,Credentials).subscribe({
      next: (res: any) => {
           localStorage.setItem('businessid', res['businessid'])
           localStorage.setItem('businessname', res['businessname'])
          this.router.navigate(['/dashboard/profile/'+localStorage.getItem('businessid')]);
      },
      error: (err) => {
        if (err.status === 401) {
          console.log('Invalid credentials');
          // show toast / error message in UI
        } else {
          console.error('Unexpected error', err);
        }
      }
  
    })
    console.log(Credentials)
  }

}
