import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Destination } from 'src/app/_models/destinations';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { DestinationService } from 'src/app/_services/destination.service';

@Component({
  selector: 'app-destionation-card',
  templateUrl: './destionation-card.component.html',
  styleUrls: ['./destionation-card.component.css']
})
export class DestionationCardComponent implements OnInit {

  @Input() destination:Destination
  
  user:User;
  
  isLiked:boolean=false;

  userLike(destination:Destination){
    this.isLiked=!this.isLiked;
    if(this.isLiked==true){
      this.addLike(this.destination);
    }
    if(this.isLiked==false){
      this.deleteLike(this.destination);
    }
  }

  deleteLike(desination:Destination){


    this.destinationService.deleteLike(this.destination.id).subscribe(()=>{
      this.destination.likesCount--;
      const index=this.user.likes.indexOf(desination.id);
      if(index>-1){
        this.user.likes.splice(index,1);
      }
      this.accountService.updateLikes(this.user);
      console.log('Deeleted');
    })

    



  }

  addLike(destination:Destination){
    this.destinationService.addLike(destination.id).subscribe(()=>{
      this.destination.likesCount++;
      this.user.likes.push(destination.id);
      this.accountService.updateLikes(this.user);
      console.log('Success');
    })
  }

  constructor(private destinationService:DestinationService,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
    //console.log(this.destination.id);
   }

  ngOnInit(): void {

    //console.log(this.destination.id);
    //console.log(this.user.likes);
    if(this.user.likes.includes(this.destination.id)){
      //console.log('JEJJJ');
      this.isLiked=true;
    }else{
      this.isLiked=false;
    }
  }

  checkLikes(des:Destination){
    let id=this.destination.id;
    this.user.likes.forEach(function(value){
      if(value==id){
        this.isLiked=true;
      }
    });
  }

}
