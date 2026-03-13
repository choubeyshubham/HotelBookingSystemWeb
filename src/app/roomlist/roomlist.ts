import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-roomlist',
  imports: [CommonModule],
  templateUrl: './roomlist.html',
  styleUrl: './roomlist.css',
})
export class Roomlist {

  @Input() roomSearchResults: any[] = [];//Input property for room list
  isAdmin:boolean;


  constructor(private router: Router, private apiService: ApiService) { //get current admin status
    this.isAdmin = this.apiService.isAdmin();
  }

  //Method to navigate to the edit room page(for admins)
  navigateToEditRoom(roomId:string){
    this.router.navigate([`/admin/edit-room/${roomId}`]);
  }

  //Method to navigate to the room details page (for users)
  navigateToRoomDetails(roomId: string){
    this.router.navigate([`/room-details/${roomId}`])
  }




}
