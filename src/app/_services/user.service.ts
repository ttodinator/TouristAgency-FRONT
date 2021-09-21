import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiUrl;

  user:User;

  getUser(){
    return this.http.get<User>(this.baseUrl+'user');
  }

  updateUser(user:any){
    return this.http.put(this.baseUrl+'user',user);
  }

  constructor(private http:HttpClient) { }
}
