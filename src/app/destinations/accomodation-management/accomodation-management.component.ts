import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Accomodation } from 'src/app/_models/accomodation';

@Component({
  selector: 'app-accomodation-management',
  templateUrl: './accomodation-management.component.html',
  styleUrls: ['./accomodation-management.component.css']
})
export class AccomodationManagementComponent implements OnInit {

  @Input() accomodationList:Accomodation[];

  inserForm:FormGroup;

  typeList=[
    {value:'Europe'},
    {value:'America'},
    {value:'Asia'},
    {value:'Middle East'}
  ];

  constructor() {
    if(!this.accomodationList){
      console.log('PRAZNAAAAAAA')
      this.accomodationList=[];
    }
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.inserForm=new FormGroup({
      type:new FormControl('',Validators.required),
      number:new FormControl('1',[Validators.required,Validators.min(1),Validators.max(20)])
    })
  }

  addMultiple(){
    
  }

}
