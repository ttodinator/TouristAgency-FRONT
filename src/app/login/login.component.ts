import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};
  currentUser$:Observable<User>;
  loginForm:FormGroup;

  @Output() cancelLogin=new EventEmitter;

  constructor(public accountService:AccountService,private router:Router, private toast:ToastrService) { }

  ngOnInit(): void {
    this.currentUser$=this.accountService.currentUser$;
    this.initializeForm();
  }

  cancel(){
    this.cancelLogin.emit(false);
  }

  initializeForm(){
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(response=>{
      console.log('Ulogovan');
      this.toast.success('System has successfully updated a photo ');
      this.toast.error('System is unable to successfully update a photo');

      //this.router.navigateByUrl('/destinations');
    })
  }

}
