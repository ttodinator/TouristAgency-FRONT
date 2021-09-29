import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../_models/reservation';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) {

  }

  user:User;
  baseUrl=environment.apiUrl;
  
  addReservation(model:any){

    return this.http.post(this.baseUrl+'reservation',model);
  }

  getReservationsForDestination(destinationId:number){
    return this.http.get<Reservation[]>(this.baseUrl+'reservation/'+destinationId);

  }

  changeReservationstatus(model:any){
    return this.http.put(this.baseUrl+'reservation',model);

  }
  
}
