import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Accomodation } from 'src/app/_models/accomodation';
import { Destination } from 'src/app/_models/destinations';
import { DestinationService } from 'src/app/_services/destination.service';

@Component({
  selector: 'app-accomodation-edit',
  templateUrl: './accomodation-edit.component.html',
  styleUrls: ['./accomodation-edit.component.css']
})
export class AccomodationEditComponent implements OnInit {

  @Input() destination:Destination;

  constructor(private modalService: BsModalService, private destinationService:DestinationService, private toast:ToastrService) { }

  inserForm:FormGroup;

  modalRef?: BsModalRef;

  currentlyEditedAccomodationIndex:number;


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

  listLength=0;

  ngOnInit(): void {
    console.log(this.destination.accomodations)
    for(let i=0;i<this.destination.accomodations.length;i++){
      this.destination.accomodations[i].orderNo=i+1;
      this.listLength++;
    }
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
        orderNo:this.listLength+1,
        editable:true
      }
      this.destination.accomodations.push(acc);
      this.listLength++;
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
    this.listLength--;
    for(let i=0;i<this.destination.accomodations.length;i++){
      this.destination.accomodations[i].orderNo=i+1;
    }
  }

  saveAccomodation(){
    console.log(this.destination);
    this.destinationService.updateAccomodations(this.destination).subscribe(res=>{
      //this.destinationService=true;
      this.toast.success('Accomodations updated successfully')
      for(let i=0;i<this.destination.accomodations.length;i++){
        this.destination.accomodations[i].editable=false;
      }
    })
  }

}
