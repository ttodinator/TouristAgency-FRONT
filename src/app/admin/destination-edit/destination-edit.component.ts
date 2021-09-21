import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Destination } from 'src/app/_models/destinations';
import { DestinationService } from 'src/app/_services/destination.service';

@Component({
  selector: 'app-destination-edit',
  templateUrl: './destination-edit.component.html',
  styleUrls: ['./destination-edit.component.css']
})
export class DestinationEditComponent implements OnInit {

  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.destinationForm.dirty){
      $event.returnValue=true;
    }
  }

  destination:Destination;
  public destinationForm:FormGroup;

  typeList=[
    {value:'Europe'},
    {value:'Summer vacation'},
    {value:'America'},
    {value:'Asia'},
    {value:'Middle East'}
  ];

  transportationList=[
    {value:'Plane'},
    {value:'Bus'},
  ];

  roomsList=[
    {id:1,name:'1 quest',checked:false},
    {id:2,name:'2 quests',checked:false},
    {id:3,name:'3 quests',checked:false},
    {id:4,name:'4 quests',checked:false},
    {id:5,name:'5 quests',checked:false},
    {id:6,name:'6 quests',checked:false},
  ];

  constructor(private route:ActivatedRoute,private toastr:ToastrService,private destinationservice:DestinationService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.destination=data.destination;
    });

    this.initializeForm();
  }




  initializeForm(){


    this.destinationForm=new FormGroup({
      id:new FormControl(),
      city:new FormControl('',[Validators.required,Validators.minLength(2)]),
      hotel:new FormControl('',[Validators.required,Validators.minLength(2)]),
      transportation:new FormControl('Plane',[Validators.required]),
      stars:new FormControl('',[Validators.required,Validators.min(2),Validators.max(7)]),
      description:new FormControl('',[Validators.required,Validators.minLength(2)]),
      price:new FormControl('',[Validators.required,Validators.min(1), Validators.max(10000)]),
      type:new FormControl('Europe',[Validators.required]),
      rooms:new FormArray([],this.roomsValidation())
    });

    this.destinationForm.patchValue({
      id:this.destination.id,
      city:this.destination.city,
      hotel:this.destination.hotel,
      transportation:this.destination.transportation,
      stars:this.destination.stars,
      description:this.destination.description,
      price:this.destination.price,
      type:this.destination.type,
      rooms:this.destination.rooms
    })

    let num=0;
    const checkArray: FormArray = this.destinationForm.get('rooms') as FormArray;

    for(let i=0;i<this.destination.rooms.length;i++){
      for(let j=0;j<this.roomsList.length;j++){
        if(this.destination.rooms[i].roomId==this.roomsList[j].id){
          this.roomsList[j].checked=true;
          checkArray.push(new FormControl(this.roomsList[j].id.toString()));
          num++;
        }
      }
    }
  }

  roomsValidation():ValidatorFn{
    return(control:FormArray)=>{
      return control?.length>0?null:{isMatching:true}
    }
  }


  editDestination(){
    console.table(this.destinationForm.value);
    this.destinationservice.updateDestination(this.destinationForm.value).subscribe(()=>{
      this.toastr.success('Successfully updated destination');
    })
  }

  reset(){
    this.destinationForm.reset();
  }


  onCheckboxChange(e) {
    const checkArray: FormArray = this.destinationForm.get('rooms') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
