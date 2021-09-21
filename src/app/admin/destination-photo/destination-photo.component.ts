import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Destination } from 'src/app/_models/destinations';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { DestinationService } from 'src/app/_services/destination.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destination-photo',
  templateUrl: './destination-photo.component.html',
  styleUrls: ['./destination-photo.component.css']
})
export class DestinationPhotoComponent implements OnInit {
  @Input() destination:Destination;
  uploader:FileUploader;
  hasBaseDropzoneOver=false;
  baseUrl=environment.apiUrl;
  user:User;

  constructor(private accountService:AccountService,private destinationService:DestinationService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropzoneOver=e;
  }

  setMainPhoto(photo:Photo){
    this.destinationService.setMainPhoto(photo.id,this.destination.id).subscribe(()=>{
      this.destination.photoUrl=photo.url;
      this.destination.photos.forEach(p=>{
        if(p.isMain)p.isMain=false;
        if(p.id===photo.id)p.isMain=true;
      })
    })
  }

  deletePhoto(photoId:number){
    this.destinationService.deletePhoto(photoId,this.destination.id).subscribe(()=>{
      this.destination.photos=this.destination.photos.filter(x=>x.id !==photoId);
    })
  }

  initializeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'destination/add-photo?destinationId='+this.destination.id,
      authToken:'Bearer '+this.user.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });

    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false;
    }

    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      const photo:Photo=JSON.parse(response);
      this.destination.photos.push(photo);
      if(photo.isMain){

      }
    }

  }

  

}
