import { Component, OnInit } from '@angular/core';
import { DestionationParams } from 'src/app/_models/destinationParams';
import { Destination } from 'src/app/_models/destinations';
import { Pagination } from 'src/app/_models/pagination';
import { DestinationService } from 'src/app/_services/destination.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {

  destinations:Destination[]=[];
  pagination:Pagination;
  isCollapsed = true;
  public destinationParams:DestionationParams;
  filterForm:FormGroup;
  user:User;


  typeList=[
    {value:'Europe'},
    {value:'America'},
    {value:'Asia'},
    {value:'Middle East'},
    {value:'All'}
  ];


  constructor(private destinationService:DestinationService,private accountService:AccountService) {
    this.destinationParams=this.destinationService.getDestinationParams();

    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);


   }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDestinations();

    

  }

  initializeForm(){
    this.filterForm=new FormGroup({
      minPrice:new FormControl(1,[Validators.required,Validators.min(1)]),
      maxPrice:new FormControl(1000,[Validators.required,Validators.max(1000)]),
      type:new FormControl('All',[Validators.required])
    })
  }

  loadDestinations(){
    this.destinationService.setDestinationParams(this.destinationParams);
    this.destinationParams.minPrice=this.filterForm.controls.minPrice.value;
    this.destinationParams.maxPrice=this.filterForm.controls.maxPrice.value;
    this.destinationParams.type=this.filterForm.controls.type.value;
    
    this.destinationService.getDestinations(this.destinationParams).subscribe(response=>{
      this.destinations=response.result;
      this.pagination=response.pagination;
    })
  }
  loadDestinationsParam(param: string){
    this.destinationService.setDestinationParams(this.destinationParams);
    this.destinationParams.orderBy=param;
    this.destinationService.getDestinations(this.destinationParams).subscribe(response=>{
      this.destinations=response.result;
      //console.log(response.result)
      this.pagination=response.pagination;
      //console.log(response.pagination)
    })
  }

  pageChanged(event:any){
    this.destinationParams.pageNumber=event.page;
    this.destinationService.setDestinationParams(this.destinationParams);
    this.loadDestinations();
  }


  resetFilters(){
    this.destinationParams=this.destinationService.resetDestinationParams();
    this.loadDestinations();
  }



}
