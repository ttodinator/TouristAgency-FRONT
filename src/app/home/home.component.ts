import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode=false;
  loginMode=false;

  constructor(private http:HttpClient,public accountService:AccountService) { }

  ngOnInit(): void {
    //this.http.get('https://localhost:5001/weatherforecast').subscribe(res=>{
      //console.log(res.toString());
    //})
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
  }

  cancelRegisterMode(event:boolean){
    this.registerMode=event;
  }

  loginTogle(){
    this.loginMode=!this.loginMode;
    console.log(this.loginMode)
  }

  cancelLoginMode(event:boolean){
    this.loginMode=event;
  }

}
