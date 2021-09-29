import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Accomodation } from '../_models/accomodation';
import { DestionationParams } from '../_models/destinationParams';
import { Destination } from '../_models/destinations';
import { PaginatedResult } from '../_models/pagination';
import { Reservation } from '../_models/reservation';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  baseUrl=environment.apiUrl;
  destinations:Destination[]=[];

  destinationsLiked:Destination[]=[];

  destinationCache=new Map();
  user:User;
  destinationParams:DestionationParams;



  constructor(private http:HttpClient,private accountService:AccountService,private toastr:ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user=user;
      this.destinationParams=new DestionationParams();
    })
  }

  getDestinationParams(){
    return this.destinationParams;
  }

  setDestinationParams(params:DestionationParams){
    this.destinationParams=params;
  }

  resetDestinationParams(){
    this.destinationParams=new DestionationParams();
    return this.destinationParams;
  }

  getDestinations(destinationParams:DestionationParams){
    var response=this.destinationCache.get(Object.values(destinationParams).join('-'));
    if(response){
      return of(response);
    }

    let params=getPaginationHeader(destinationParams.pageNumber,destinationParams.pageSize);

    params=params.append('minPrice',destinationParams.minPrice.toString());
    params=params.append('maxPrice',destinationParams.maxPrice.toString());
    params=params.append('type',destinationParams.type);
    params=params.append('orderBy',destinationParams.orderBy);
    if(this.destinations.length>0) return of (this.destinations)
    return getPaginatedResult<Destination[]>(this.baseUrl+'destination',params,this.http)
    .pipe(map(response=>{
      this.destinationCache.set(Object.values(destinationParams).join('-'),response);
      return response;
    }))
  }


  getDestination(hotel:string){
    const destination=[...this.destinationCache.values()]
      .reduce((arr,elem)=>arr.concat(elem.result),[])
      .find((destination:Destination)=>destination.hotel===hotel);
      if(destination){
        return of (destination);
      }
    return this.http.get<Destination>(this.baseUrl+'destination/'+hotel);
  }

  getLikedDestinations(){
    return this.http.get<Destination[]>(this.baseUrl+'user/user-likes',{});
  }

  getReservedDestinations(){
    return this.http.get<Reservation[]>(this.baseUrl+'user/user-reservations',{});
  }

  addLike(id:number){
    this.toastr.success('Destination added to liked list')
    return this.http.post(this.baseUrl+'user/like-destination/'+id.toString(),{})

  }

  deleteLike(id:number){
    this.toastr.error('Destination removed from liked list')
    return this.http.delete(this.baseUrl+'user/dislike-destination/'+id.toString(),{})
  }




  addDestination(destination:any){
    return this.http.post<Destination>(this.baseUrl+'destination',destination,{});
  }


  updateDestination(dest:any){
    return this.http.put(this.baseUrl+'destination',dest);
  }



  setMainPhoto(photoId:number,destinationId:number){
    return this.http.put(this.baseUrl+'destination/set-main-photo/?photoId='+photoId+'&destinationId='+destinationId,{});
  }

  deletePhoto(photoId:number,destinationId:number){
    return this.http.delete(this.baseUrl+'destination/delete-photo/?photoId='+photoId+'&destinationId='+destinationId);
  }

  getDistinctAccomodation(destinationId:number){
    return this.http.get<string[]>(this.baseUrl+'destination/distinct/'+destinationId);
  }

  getFreeAccomoadtionByName(destinationId:number,accomodationName:string){
    return this.http.get<Accomodation[]>(this.baseUrl+'destination/free/?destinationId='+destinationId+'&accomodationName='+accomodationName);
  }

  saveAccomodations(model:any){
    return this.http.put<Destination>(this.baseUrl+'destination/save-accomodations',model);
  }

  updateAccomodations(model:any){
    return this.http.put<Destination>(this.baseUrl+'destination/update-accomodations',model);
  }

}
