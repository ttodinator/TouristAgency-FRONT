import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  
}
