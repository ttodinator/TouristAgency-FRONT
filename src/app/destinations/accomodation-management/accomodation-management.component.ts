import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/_models/accomodation';
import { Destination } from 'src/app/_models/destinations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DestinationService } from 'src/app/_services/destination.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accomodation-management',
  templateUrl: './accomodation-management.component.html',
  styleUrls: ['./accomodation-management.component.css']
})
export class AccomodationManagementComponent implements OnInit {

  @Input() destination:Destination;

  modalRef?: BsModalRef;

  updatedDestination:boolean=false;

  currentlyEditedAccomodationIndex:number;

  inserForm:FormGroup;
  editAccomodationForm:FormGroup;

  typeList=[
    {value:'Single'},
    {value:'Double'},
    {value:'Triple'},
    {value:'Apartmant'},
    {value:'President suite'}
  ];

  balconyList=[
    {value:true,text:'Yes'},
    {value:false,text:'No'},
  ]

  listCount=0;

  constructor(private modalService: BsModalService, private destinatinServices:DestinationService, private toast:ToastrService) {
    if(!this.destination){
      console.log('PRAZNAAAAAAA')
    }
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.inserForm=new FormGroup({
      type:new FormControl('Single',Validators.required),
      number:new FormControl('1',[Validators.required,Validators.min(1),Validators.max(20)])

    });

    this.editAccomodationForm=new FormGroup({
      type:new FormControl('Single',Validators.required),
      pricePerDay:new FormControl('0',[Validators.required,Validators.min(0),Validators.max(10000)]),
      roomNumber:new FormControl('0',[Validators.required,Validators.min(0),Validators.max(20000)]),
      balcony:new FormControl('No',[Validators.required]),
    })
  }

  addMultiple(){
    for(let i=0;i<this.inserForm.controls['number'].value;i++){
      let acc:Accomodation={
        id:0,
        destinationId:this.destination.id,
        name:this.inserForm.controls['type'].value,
        pricePerDay:0,
        numberOfPeople:0,
        occupied:false,
        roomNumber:0,
        balcony:false,
        orderNo:this.listCount+1,
        editable:false
      }
      this.destination.accomodations.push(acc);
      this.listCount++;
    }
  }

  removeFromList(orderNo:number){
    for(let i=0;i<this.destination.accomodations.length;i++){
      if(this.destination.accomodations[i].orderNo==orderNo){
        let index=this.destination.accomodations.indexOf(this.destination.accomodations[i]);
        if(index>-1){
          this.destination.accomodations.splice(index,1);
        }
      }
    }
    this.listCount--;
    for(let i=0;i<this.destination.accomodations.length;i++){
      this.destination.accomodations[i].orderNo=i+1;
    }
  }

  editAccomodation(template: TemplateRef<any>,orderNumber:number){
    console.log(orderNumber);
    for(let i=0;i<this.destination.accomodations.length;i++){
      if(this.destination.accomodations[i].orderNo==orderNumber){
        this.currentlyEditedAccomodationIndex=i;
        this.editAccomodationForm.patchValue({
          type:this.destination.accomodations[i].name,
          pricePerDay:this.destination.accomodations[i].pricePerDay,
          roomNumber:this.destination.accomodations[i].roomNumber,
          balcony:this.destination.accomodations[i].balcony
        })
      }
    }

    this.modalRef = this.modalService.show(template);
  }

  updateAccomodation(){
    if(this.destination.accomodations[this.currentlyEditedAccomodationIndex].balcony=this.editAccomodationForm.controls['balcony'].value){
      this.destination.accomodations[this.currentlyEditedAccomodationIndex].balcony=true

    }else{
      this.destination.accomodations[this.currentlyEditedAccomodationIndex].balcony=false
    }
    this.destination.accomodations[this.currentlyEditedAccomodationIndex].name=this.editAccomodationForm.controls['type'].value;
    this.destination.accomodations[this.currentlyEditedAccomodationIndex].pricePerDay=this.editAccomodationForm.controls['pricePerDay'].value;
    this.destination.accomodations[this.currentlyEditedAccomodationIndex].roomNumber=this.editAccomodationForm.controls['roomNumber'].value;
    this.modalRef?.hide();
  }

  saveAccomodation(){
    console.log(this.destination);
    this.destinatinServices.saveAccomodations(this.destination).subscribe(res=>{
      this.updatedDestination=true;
      this.toast.success('Accomodations added successfully')
    })
  }

}
