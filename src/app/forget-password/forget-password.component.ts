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
    }, error => {
      console.log(error);
    })

    //   this.loginRegisterService.getAllUsers().subscribe((response: any[]) => {
    //     this.allExistingUsers = response;
    //   }, error => {
    //     console.log(error);
    //   })
    //   const found = this.allExistingUsers.find(user => user.email === this.forgetPasswordForm.value.email)

    if (this.found) {
      this.router.navigateByUrl('/resetpassword');
    }
    else {
      this.toasterService.pop('error', 'Error', 'email does not exist');
    }
    // this.loginRegisterService.getAllUsers().subscribe((response: any[]) => {
    //   this.allExistingUsers = response;
    // }, error => {
    //   console.log(error);
    // })

    //   const found = this.allExistingUsers.find(user => user.email === this.forgetPasswordForm.value.email)
    //   if (found) {
    //     this.router.navigateByUrl('/resetpassword');

    //   }

    //   else {
    //     alert('email does not exist')
    //   }
  }

}
