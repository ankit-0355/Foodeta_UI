import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ ProfileData } from '../../../model/models';
import { form, Field, readonly, disabled } from '@angular/forms/signals';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Field],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  http = inject(HttpClient);
  temp = signal<any>('');
  editProfile = signal(false)

  profile_data = signal<ProfileData>({
    business_name: '',
    description: '',
    email: '',
    phone_number: '',
    address: ''
  });

  profile_form = form(this.profile_data, (schema)=>{
    disabled(schema.business_name, ()=>!this.editProfile())
    disabled(schema.description,() => !this.editProfile())
    disabled(schema.email,() => !this.editProfile())
    disabled(schema.phone_number,() => !this.editProfile())
    disabled(schema.address,() => !this.editProfile())
  });

  ngOnInit() {
    // Initialization logic can be added here
    const url="http://127.0.0.1:8080/dashboard/profile/1"
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.profile_data.set({
          business_name: res.user_profile.business_name,
          description: res.user_profile.description,
          email: res.user_profile.email,
          phone_number: res.user_profile.phone_number,
          address: res.user_profile.address
        });  
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      }
    });
  }

  saveProfile() {
    const url="http://127.0.0.1:8080/dashboard/profile/1"
    this.http.put(url,this.profile_data()).subscribe({
      next: (res) => {
        console.log(this.profile_data())
        console.log("response", res)
      },
      error: (res) => {
        console.log(res)
      }
    })
  }

  toggleEdit() {
    this.editProfile.update(v => !v);
  }


}
