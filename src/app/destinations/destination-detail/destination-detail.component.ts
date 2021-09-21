import { Component,TemplateRef , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Accomodation } from 'src/app/_models/accomodation';
import { Destination } from 'src/app/_models/destinations';
import { DestinationService } from 'src/app/_services/destination.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Passenger } from 'src/app/_models/passenger';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css']
})
export class DestinationDetailComponent implements OnInit {

  destination:Destination;

  userAsAPassengerText:string='I am a passenger'


  public reservationForm:FormGroup;
  public accomodationForm:FormGroup;
  public passengerForm:FormGroup;
  public userPassportForm:FormGroup;

  user:User;
  userPassport:string;
  userAsPassengerId:number;

  passengerList:Passenger[]=[];
  id:number=1;
  editingPassengerId:number;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  duration;
  durationDays;
  distinctAccomodation:string[];
  freeAccomodation:Accomodation[]=[];
  accomodationName:string;

  dates:Date[];
  date1:Date;
  date2:Date

  totalPriceFirst:number=0;
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
  modalRefEdit?: BsModalRef;
  modalRefUserPassport?:BsModalRef;

  model:any=[];
  selectedAccomodation:Accomodation;

  iAmAPassenger:boolean=false;

  constructor(private userService:UserService,private modalService: BsModalService,private destinationService:DestinationService,private route:ActivatedRoute,private reservationService:ReservationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.destination=data.destination;
      this.destinationService.getDistinctAccomodation(this.destination.id).subscribe(response=>{
        this.distinctAccomodation=response;
        this.accomodationForm=new FormGroup({
          accomodationName:new FormControl('myDefaultValue', Validators.required)
        })
      })
    });

    this.userService.getUser().subscribe(response=>{
      this.user=response;
    })


    this.userPassportForm=new FormGroup({
      passportNumber:new FormControl('',[Validators.required,Validators.pattern('^(?!^0+$)[a-zA-Z0-9]{3,20}$')])
    })

    // this.bsValue.setDate(this.bsValue.getDate() );
    // this.maxDate.setDate(this.bsValue.getDate() );
    // this.bsRangeValue = [this.bsValue, this.maxDate];

    // this.initializeForm();
    // this.duration=this.maxDate.getTime()-this.bsValue.getTime()
    // this.durationDays=this.duration/(1000 * 3600 * 24);
    // this.totalPriceFirst=this.reservationForm.controls['numberOfPeople'].value*this.destination.price*this.durationDays;


  }

  initializeForm(){
    this.passengerForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(2)]),
      surname:new FormControl('',[Validators.required,Validators.minLength(2)]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]+'),Validators.maxLength(15)]),
      email:new FormControl('',[Validators.email]),
      passportNumber:new FormControl('',[Validators.required,Validators.pattern('^(?!^0+$)[a-zA-Z0-9]{3,20}$')])
    })
  }

  patchForm(id:number){
    this.editingPassengerId=id;
    let passenger:Passenger;
    for(let i=0;i<this.passengerList.length;i++){
      if(this.passengerList[i].id==id){
        passenger=this.passengerList[i]
      }
    }

    this.initializeForm();
    this.passengerForm.patchValue({
      id:passenger.id,
      name:passenger.name,
      surname:passenger.surname,
      phoneNumber:passenger.phoneNumber,
      email:passenger.email,
      passportNumber:passenger.passportNumber
    })
  }

  // initializeForm(){
  //   this.reservationForm=new FormGroup({
  //     dates:new FormControl('',[Validators.required]),
  //     numberOfPeople:new FormControl('1',[Validators.required,Validators.max(10),Validators.min(1)]),
  //     totalPrice:new FormControl('',[Validators.required,Validators.min(0)]),
  //     destinationId:new FormControl('',),
  //   });

  //   this.reservationForm.patchValue({
  //     dates:this.bsRangeValue,
  //     numberOfPeople:this.destination.rooms[0].roomId
  //   })

  // }

  // reserve(){
  //   this.reservationForm.patchValue({
  //     totalPrice:this.totalPriceFirst,
  //     destinationId:this.destination.id
  //   })

  //   console.log(this.reservationForm.value);
  //   this.reservationService.addReservation(this.reservationForm.value).subscribe(()=>{
  //     this.toastr.success('Your reservation has been successfuly saved');
  //   })
  // }

  // updatePrice(event: any){
  //   this.dates=this.reservationForm.controls['dates'].value;
  //   this.date1=this.dates[0];
  //   this.date2=this.dates[1];
  //   this.duration=this.date2.getTime()-this.date1.getTime()
  //   this.durationDays=this.duration/(1000 * 3600 * 24);
  //   this.totalPriceFirst=this.reservationForm.controls['numberOfPeople'].value*this.destination.price*this.durationDays;

  // }

  // getTotalPrice(){
  //   return this.totalPriceFirst;
  // }

  optionChange(event:any){
    console.log(event.target.value);
    this.accomodationName=event.target.value;
    this.destinationService.getFreeAccomoadtionByName(this.destination.id,event.target.value).subscribe(response=>{
      this.freeAccomodation=response;
      this.selectedAccomodation=null;
    })
  }

  openAccomodationModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openPassengerModal(template: TemplateRef<any>) {
    this.initializeForm();
    this.modalRef1 = this.modalService.show(template);
  }

  openUserPassportModal(template: TemplateRef<any>) {
    if(this.iAmAPassenger==true){
      this.removePassenger(this.userAsPassengerId);
      this.iAmAPassenger=false;
      this.userAsAPassengerText='I am a passenger'
    }else{
      this.modalRefUserPassport = this.modalService.show(template);
    }
  }

  openEditPassengerModal(template: TemplateRef<any>,id:number) {
    this.patchForm(id);
    this.modalRefEdit = this.modalService.show(template);
  }

  closeEditPassengerModal() {
    this.modalRefEdit?.hide();
  }

  chooseAccomodation(event:any){
    this.selectedAccomodation=this.freeAccomodation.find(x=>x.id==event.target.value);
    console.log(this.selectedAccomodation);
    this.initializeForm();
    this.modalService.hide();

  }

  addPassenger(){
    let passenger:Passenger={
      id:this.id,
      name:this.passengerForm.controls['name'].value,
      surname:this.passengerForm.controls['surname'].value,
      phoneNumber:this.passengerForm.controls['phoneNumber'].value,
      email:this.passengerForm.controls['email'].value,
      passportNumber:this.passengerForm.controls['passportNumber'].value
    };
    this.id++;
    this.passengerList.push(passenger);
    this.modalRef1.hide();
    console.log(passenger);
  }

  removePassenger(id:number){
    console.log(id);
    if(this.passengerList.length==1 && id){
      if(this.passengerList[0].id==this.userAsPassengerId){
        this.iAmAPassenger=false;
        this.userAsAPassengerText='I am a passenger'
      }
      this.passengerList.length=0;
      this.id=1;
      return;
    }
    for(let i=0;i<this.passengerList.length;i++){
      if(this.passengerList[i].id==id){
        if(id==this.userAsPassengerId){
            this.iAmAPassenger=false;
            this.userAsAPassengerText='I am a passenger'
        }
        let index=this.passengerList.indexOf(this.passengerList[i]);
        if(index>-1){
          this.passengerList.splice(index,1);
        }
      }
    }
    this.id=1;
    for(let i=0;i<this.passengerList.length;i++){
      this.passengerList[i].id=this.id;
      this.id++;
    }
  }

  editPassenger(){
    for(let i=0;i<this.passengerList.length;i++){
      if(this.passengerList[i].id==this.editingPassengerId){
        this.passengerList[i].name=this.passengerForm.controls['name'].value;
        this.passengerList[i].surname=this.passengerForm.controls['surname'].value;
        this.passengerList[i].phoneNumber=this.passengerForm.controls['phoneNumber'].value;
        this.passengerList[i].email=this.passengerForm.controls['email'].value;
        this.passengerList[i].passportNumber=this.passengerForm.controls['passportNumber'].value;

      }
    }
    this.modalRefEdit.hide();
  }

  setUserAsAPassenger(){
    this.iAmAPassenger=!this.iAmAPassenger;

    if(this.iAmAPassenger==true){
      let passenger:Passenger={
        id:this.id,
        name:this.user.name,
        surname:this.user.surname,
        phoneNumber:this.user.cellphoneNumber,
        email:this.user.userEmail,
        passportNumber:this.userPassportForm.controls['passportNumber'].value
      };

      this.passengerList.push(passenger);
      this.userAsPassengerId=this.id;
      this.id++;
      this.modalRefUserPassport.hide();
      this.userAsAPassengerText='I am not a passenger'
    }
  }


  bookReservation(){
    let model:any={};
    model.accomodationId=this.selectedAccomodation.id;
    model.passengers=this.passengerList;
    console.log(model);
    this.reservationService.addReservation(model).subscribe(()=>{
      console.log('aaaa');

    })
    

  }


}
