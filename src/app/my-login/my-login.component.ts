import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';


@Component({
  selector: 'app-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

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

    this.loginRegisterService.loginCompany(this.myLoginForm.value).subscribe((response: any) => {
      localStorage.setItem('token', response.token)
      this.route.navigate(['/dashboard'])
    }, error => {
      alert("verify email or password?")
      console.log(error);
    })
  }
}
