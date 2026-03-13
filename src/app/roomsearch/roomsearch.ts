import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-roomsearch',
  imports: [CommonModule, FormsModule],
  templateUrl: './roomsearch.html',
  styleUrl: './roomsearch.css',
})
export class Roomsearch implements OnInit {

  @Output() searchResults = new EventEmitter<any[]>(); //Emit the result

  startDate: string | null = null; // Store date as string
  endDate: string | null = null; // Store date as string
  roomType: string = '';  // Selected room type
  roomTypes: string[] = []; // Available room types
  error: any = null;

  minDate: string = new Date().toISOString().split('T')[0];   // Current date in 'DD/MM/YYYY' format


  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.fetchRoomTypes();
  }

  fetchRoomTypes() {
    this.apiService.getRoomTypes().subscribe({
      next: (types: any) => {
        this.roomTypes = types;
      },
      error: (err: any) => {
        this.showError(
          err?.error?.message || 'Error fetching room types: ' + err
        );
        console.log(err);
      },
    });
  }

  showError(msg: string): void {
    this.error = msg;
    setTimeout(() => {
      this.error = null;
    }, 5000);
  }

  handleSearch() {
    if (!this.startDate || !this.endDate || !this.roomType) {
      this.showError("Please set all Fields");
      return;
    }

    //Convert startDate and endDate room string to Date
    const formattedStartDate = new Date(this.startDate);
    const formattedEndDate = new Date(this.endDate);

    //check if the dates are valid
    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      this.showError('Invalid date format');
      return;
    }

    //convert the Date objects to 'DD/MM/YYYY' format
    const startDateStr = formattedStartDate.toLocaleDateString('en-IN');
    const endDateStr = formattedEndDate.toLocaleDateString('en-IN');

    console.log('formattedStartDate: ' + startDateStr);
    console.log('formattedEndDate: ' + endDateStr);
    console.log('roomType: ' + this.roomType);

    this.apiService
      .getAvailableRooms(startDateStr, endDateStr, this.roomType)
      .subscribe({
        next: (resp: any) => {
          if (resp.room.length === 0) {
            this.showError(
              'Room type not currently available for the selected date'
            );
            return;
          }
          this.searchResults.emit(resp.rooms); // Emit the room data
          this.error = '';//clear any previous errors
        },
        error: (error: any) => {
          this.showError(error?.error?.message || error.message);
        },
      });


  }


}
