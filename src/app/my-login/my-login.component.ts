import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  allExistingUsers: any[];
  submitted = false;
  myLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(private route: Router, private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.myLoginForm.invalid) {
      return;
    }

    this.loginRegisterService.getAllUsers().subscribe((response: any[]) => {
      this.allExistingUsers = response;
    }, error => {
      console.log(error);
    })

    const found = this.allExistingUsers.find(user => user.email === this.myLoginForm.value.email && user.password === this.myLoginForm.value.password)

    if (found) {
      this.route.navigate(['/home'])
    }
    else {
      alert("verify email or password?")
    }

  }

}
