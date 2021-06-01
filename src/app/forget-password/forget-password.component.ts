import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css',
  '../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ForgetPasswordComponent implements OnInit {

  found: any;
  submitted = false;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private router: Router, private loginRegisterService: LoginRegisterService, private toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.loginRegisterService.forgotPassword(this.forgetPasswordForm.value.email).subscribe((response: any[]) => {
      console.log(response)
      this.found = response;
      this.toasterService.pop('success', 'Success', 'email sent!');
    }, error => {
      console.log(error);
      this.toasterService.pop('error', 'Error', 'email does not exist');
    })


  }

}
