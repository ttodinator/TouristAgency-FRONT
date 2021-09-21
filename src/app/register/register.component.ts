import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister=new EventEmitter;

  validationErrors:string[]=[];
  public registerForm:FormGroup;

  constructor(private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(2)]),
      surname:new FormControl('',[Validators.required,Validators.minLength(2)]),
      username:new FormControl('',[Validators.required,Validators.minLength(2)]),
      cellphoneNumber:new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]+'),Validators.maxLength(12)]),
      userEmail:new FormControl('',[Validators.required,Validators.email]),
      dateOfBirth:new FormControl(),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPassword:new FormControl('',[Validators.required,this.matchPassword('password')])
    });

    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })

  }


  matchPassword(pass:string):ValidatorFn{
    return (control:AbstractControl)=>{
      return control?.value===control?.parent?.controls[pass].value?null:{isMatching:true}
    }
  }

  register(){

    console.log(this.registerForm.value)
    this.accountService.register(this.registerForm.value).subscribe(response=>{
      this.router.navigateByUrl('/destinations');
    },error=>{
      this.validationErrors=error;
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
