import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { pwConfirmationValidator } from '../validators/passwordConfirmationValidator';


@Component({
  selector: 'app-register',
  templateUrl: './my-register.component.html',
  styleUrls: ['./my-register.component.css']
})
export class MyRegisterComponent implements OnInit {


  submitted = false;
  myRegisterForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    // companyDescription: new FormControl('', [Validators.required]),
    // photo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(5)])
  }, {
    validators: [pwConfirmationValidator]
  });
  constructor(private route: Router, private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.myRegisterForm.invalid) {
      return;
    }
    this.loginRegisterService.registerCompany(this.myRegisterForm.value).subscribe((response: any) => {
      this.myRegisterForm.reset();
      this.submitted = false;
      alert('account created');
      this.route.navigate(['/login'])
    }, error => {
      console.log(error);
      alert('Email is already in use');
    })
  }
}
