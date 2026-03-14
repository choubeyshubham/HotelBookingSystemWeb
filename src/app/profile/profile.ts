import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterLink ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile  implements OnInit{

  user: any=null;
  bookings:any[]=[];
  error:any=null;

  constructor(private apiService:ApiService, private router:Router){

  }

  ngOnInit():void{
    this.fetchUserProfile();
  }

  //Fetch User Profile and booking
  fetchUserProfile(){
    this.apiService.myProfile().subscribe({
      next:(response: any)=>{
        this.user =response.user;
        //Fetch booking after the user profile is fetched
        this.apiService.myBookings().subscribe({
          next:(bookingResponse: any)=>{
            this.bookings=bookingResponse.bookings;
          },
          error:(err:any)=>{
            this.showError(
              err?.error?.message || err?.error || 'Error getting my bookings: '+err
            );
          },
        });
      },
      error:(err:any)=>{
        this.showError(
          err?.error?.message ||
          err?.error ||
          'Error getting my profile info '+ err
        );
      },
    });
  }

  //Handles Error
  showError(msg:string){
    this.error=msg;
    setTimeout(()=>{
      this.error=null
    },4000);
  }

  //Handle Logout{
  handleLogout() {
    this.apiService.logout();
    this.router.navigate(['/home']);
  }

  //Navigate to edit profile page
  handleEditProfile(){
    this.router.navigate(['/edit-profile']);
  }



}
