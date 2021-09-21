import { Component, OnInit } from '@angular/core';
import { DestionationParams } from 'src/app/_models/destinationParams';
import { Destination } from 'src/app/_models/destinations';
import { Pagination } from 'src/app/_models/pagination';
import { AccountService } from 'src/app/_services/account.service';
import { DestinationService } from 'src/app/_services/destination.service';

@Component({
  selector: 'app-destination-management',
  templateUrl: './destination-management.component.html',
  styleUrls: ['./destination-management.component.css']
})
export class DestinationManagementComponent implements OnInit {

  destinations:Destination[]=[];

  pagination:Pagination;
  public destinationParams:DestionationParams;

  constructor(private destinationService:DestinationService,private accountService:AccountService) {
    this.destinationParams=this.destinationService.getDestinationParams();

   }

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(){
    this.destinationService.setDestinationParams(this.destinationParams);
    this.destinationService.getDestinations(this.destinationParams).subscribe(response=>{
      this.destinations=response.result;
      this.pagination=response.pagination;
    })
  }

  pageChanged(event:any){
    this.destinationParams.pageNumber=event.page;
    this.destinationService.setDestinationParams(this.destinationParams);
    this.loadDestinations();
  }


}
