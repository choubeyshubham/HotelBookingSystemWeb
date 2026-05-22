import { Component } from '@angular/core';
import {ApiService} from '../service/api.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule,RouterLink],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {

  user: any = null;
  error: any = null;




  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  // Fetch user profile on component initialization
  fetchUserProfile(): void {
    this.apiService.myProfile().subscribe({
      next: (response: any) => {
        this.user = response.user;
        console.log(this.user); // Optional, for debugging
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Error fetching user profile');
      },
    });
  }

  showError(message: string) {
    this.error = message;
    setTimeout(() => {
      this.error = null;
    }, 4000);
  }

  // Handle account deletion
  handleDeleteProfile(): void {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? If you delete your account, you will lose access to your profile and booking history.'
      )
    ) {
      return;
    }

    this.apiService.deleteAccount().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Error Deleting account');
      },
    });
  }



}
