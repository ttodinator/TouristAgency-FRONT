import { Component, Input, OnInit ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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

  currentlyEditedReservationid:number;
  currentlyEditedUserid:number;
  currentlyEditedAccomodationid:number;



  modalRef?: BsModalRef;

  constructor(private reservationService:ReservationService, private modalService: BsModalService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.reservationService.getReservationsForDestination(this.destination.id).subscribe(response=>{
      console.log(response);
      this.reservations=response;
    })
  }

  editStatus(template: TemplateRef<any>,id:number,userId:number,accId:number) {
    this.currentlyEditedReservationid=id;
    this.currentlyEditedUserid=userId;
    console.log(this.currentlyEditedUserid);
    this.currentlyEditedAccomodationid=accId;
    this.modalRef = this.modalService.show(template);
  }

  changeStatus(status:number){
    let model:any={};
    model.reservationId=this.currentlyEditedReservationid;
    model.destinationId=this.destination.id;
    model.userId=this.currentlyEditedUserid;
    model.accomodationid=this.currentlyEditedAccomodationid;
    if(status==1){
      model.status='Approved';
    }
    if(status==2){
      model.status='Rejected';
    }
    if(status==3){
      model.status='Created';
    }
    console.log(model);
    this.reservationService.changeReservationstatus(model).subscribe(()=>{
      this.toast.success('Status successfully changed');
      for(let i=0;i<this.reservations.length;i++){
        if(this.reservations[i].reservationId==this.currentlyEditedReservationid){
          this.reservations[i].status=model.status;
        }
      }
    })
  }

}
