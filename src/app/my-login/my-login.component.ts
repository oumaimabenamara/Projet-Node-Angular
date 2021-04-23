import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  users: any;
  submitted = false;
  myLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(private route: Router, private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
    this.users=this.loginRegisterService.getAllUsers();
  }

  submit()
  {
    this.submitted = true;
    if(this.myLoginForm.invalid)
    {
      return ;
    }

    let found = this.users.find(x=> x.email === this.myLoginForm.value.email && x.password === this.myLoginForm.value.password);
    
    if(found !== undefined)
    {
      this.route.navigateByUrl('/home');
    }
    else{
      alert("verify email or password?")
    }
    
  }

}
