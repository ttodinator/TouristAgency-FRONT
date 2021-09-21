import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

navbarOpen=false;

  model:any={}
  loggedIn:boolean=false;
  //public currentUser$:Observable<User>;
  currentUser:User;

  constructor(public accountService:AccountService,private router:Router) { 
  }

  ngOnInit(): void {
    this.accountService.doNothing();
  }

  toggleNavbar(){
    this.navbarOpen=!this.navbarOpen;
  }

  setCurrentUser(){
    //const user:User=JSON.parse(localStorage.getItem('user'));
    //this.accountService.doNothing();
    //this.accountService.setCurrentUser(user);
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('');
  }

}
