import { Component, Input, OnInit ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Destination } from 'src/app/_models/destinations';
import { Reservation } from 'src/app/_models/reservation';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {

  @Input() destination:Destination;

  reservations:Reservation[]=[];

  modalRef?: BsModalRef;

  constructor(private reservationService:ReservationService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.reservationService.getReservationsForDestination(this.destination.id).subscribe(response=>{
      console.log(response);
      this.reservations=response;
    })
  }

  editStatus(template: TemplateRef<any>,id:number) {
    this.modalRef = this.modalService.show(template);
  }

}
