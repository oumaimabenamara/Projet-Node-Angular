import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css',
  '../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyLoginComponent implements OnInit {

  submitted = false;
  myLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(private route: Router, private loginRegisterService: LoginRegisterService, private toasterService: ToasterService) { }

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
      this.toasterService.pop('success', 'Success', 'logged in successfully');
    }, error => {
      this.toasterService.pop('error', 'Error', 'verify email or password?');
      console.log(error);
    })
  }
}
