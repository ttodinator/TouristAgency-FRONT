import { Component, OnInit } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { AccountService } from '../_services/account.service';
import { DestinationService } from '../_services/destination.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  reservations:Reservation[]=[];

  constructor(private destinationService:DestinationService) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(){
    this.destinationService.getReservedDestinations().subscribe(response=>{
      this.reservations=response
    });
  }

}
