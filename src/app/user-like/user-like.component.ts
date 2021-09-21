import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Destination } from '../_models/destinations';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { DestinationService } from '../_services/destination.service';

@Component({
  selector: 'app-user-like',
  templateUrl: './user-like.component.html',
  styleUrls: ['./user-like.component.css']
})
export class UserLikeComponent implements OnInit {

  destinations:Destination[]=[];

  user:User;

  constructor(private accountService:AccountService,private destinationService:DestinationService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
   }

  ngOnInit(): void {
    this.getUserLikes();
  }


  getUserLikes(){
    this.destinationService.getLikedDestinations().subscribe(destinations=>{
      this.destinations=destinations;
    })
  }

}
