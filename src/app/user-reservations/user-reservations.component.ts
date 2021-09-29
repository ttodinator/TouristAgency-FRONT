import { Component, OnInit, TemplateRef } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { AccountService } from '../_services/account.service';
import { DestinationService } from '../_services/destination.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  reservations:Reservation[]=[];

  modalRef?: BsModalRef;

  selectedReservation:Reservation;


  constructor(private destinationService:DestinationService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(){
    this.destinationService.getReservedDestinations().subscribe(response=>{
      console.log(response);
      this.reservations=response
    });
  }

  viewPassengers(id:number){
    for(let i=0;i<this.reservations.length;i++){
      if(this.reservations[i].reservationId==id){
        this.selectedReservation=this.reservations[i]
      }
    }
  }

}
