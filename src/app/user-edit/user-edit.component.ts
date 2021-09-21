import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public editForm:FormGroup;
  
  public user:User;

  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }


  constructor(private fb:FormBuilder,private userService:UserService,private route:ActivatedRoute,private toastr:ToastrService) { }

  initializeForm(){
    this.editForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(2)]),
      surname:new FormControl('',[Validators.required,Validators.minLength(2)]),
      username:new FormControl('',[Validators.required,Validators.minLength(2)]),
      cellphoneNumber:new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]+'),Validators.maxLength(12)]),
      userEmail:new FormControl('',[Validators.required,Validators.email]),
      dateOfBirth:new FormControl()
    });

    this.editForm.patchValue({
      name:this.user.name,
      surname:this.user.surname,
      username:this.user.username,
      cellphoneNumber:this.user.cellphoneNumber,
      userEmail:this.user.userEmail,
      dateOfBirth:this.user.dateOfBirth
    })


    
  }

  ngOnInit(): void {

    this.route.data.subscribe(data=>{
      this.user=data.user;
      this.initializeForm();
    })
  }

  loadUser(){
    this.userService.getUser().subscribe(response=>{
      this.user=response;
    });
  }

  update(){
    this.userService.updateUser(this.editForm.value).subscribe(()=>{
      this.toastr.success('User edited successfully')
      this.initializeForm();
    })
  }

}
