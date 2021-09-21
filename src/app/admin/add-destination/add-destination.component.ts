import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Accomodation } from 'src/app/_models/accomodation';
import { Destination } from 'src/app/_models/destinations';
import { DestinationService } from 'src/app/_services/destination.service';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {


  bsRangeValue: Date[];

  addedDestination:Destination;

  public destinationForm:FormGroup;
  form: FormGroup;
  CountryData: Array<any> = [
    { name: 'IND', value: 'India' },
    { name: 'AUS', value: 'Australia' },
    { name: 'USA', value: 'America' },
    { name: 'RUS', value: 'Rusia' },
    { name: 'Eng', value: 'England' }
  ];


  typeList=[
    {value:'Europe'},
    {value:'America'},
    {value:'Asia'},
    {value:'Middle East'}
  ];

  transportationList=[
    {value:'Plane'},
    {value:'Bus'},
  ];

  roomsList=[
    {id:'1',name:'1 quest'},
    {id:'2',name:'2 quests'},
    {id:'3',name:'3 quests'},
    {id:'4',name:'4 quests'},
    {id:'5',name:'5 quests'},
    {id:'6',name:'6 quests'},
  ];

  stars=[
    {value:2},
    {value:3},
    {value:4},
    {value:5},
    {value:6},
    {value:7},
  ];

  constructor(private destinationService:DestinationService,private fb:FormBuilder,private toastr:ToastrService) {
    /*this.form = this.fb.group({
      checkArray: this.fb.array([]),
      city:new FormControl('',[Validators.required,Validators.minLength(2)]),
      hotel:new FormControl('',[Validators.required,Validators.minLength(2)]),
      transportation:new FormControl('Plane',[Validators.required]),
      stars:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required,Validators.minLength(2)]),
      price:new FormControl('',[Validators.required,Validators.max(10000)]),
      type:new FormControl('Europe',[Validators.required]),
    })*/




   }

  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm(){


    this.destinationForm=new FormGroup({
      city:new FormControl('',[Validators.required,Validators.minLength(2)]),
      hotel:new FormControl('',[Validators.required,Validators.minLength(2)]),
      transportation:new FormControl('Plane',[Validators.required]),
      stars:new FormControl('2',[Validators.required,Validators.min(2),Validators.max(7)]),
      description:new FormControl('',[Validators.required,Validators.minLength(20)]),
      tripPlan:new FormControl('',[Validators.required,Validators.minLength(20)]),
      type:new FormControl('Europe',[Validators.required]),
      dates:new FormControl('',[Validators.required]),
    });
  }

  roomsValidation():ValidatorFn{
    return(control:FormArray)=>{
      return control?.length>0?null:{isMatching:true}
    }
  }

  // onCheckboxChange(e) {
  //   const checkArray: FormArray = this.destinationForm.get('rooms') as FormArray;
  
  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }



  addDestination(){
    console.table(this.destinationForm.value);
    this.destinationService.addDestination(this.destinationForm.value).subscribe(response=>{
      
      console.log(response);
      this.addedDestination=response;
      this.toastr.success('You have successfully saved a destination')
    })
  }

  reset(){
    this.destinationForm.reset();
  }

}
