import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { pwNewConfirmationValidator } from '../validators/passwordConfirmationValidator';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css',
  '../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
  submitted = false;
  resetPasswordForm: FormGroup;

  constructor(private router: Router, private loginRegisterService: LoginRegisterService, private activatedRoute: ActivatedRoute, private toasterService: ToasterService) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    this.resetPasswordForm = new FormGroup({
      token: new FormControl(token),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    }, {
      validators: [pwNewConfirmationValidator]
    });
  }

  submit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loginRegisterService.resetPassword(this.resetPasswordForm.value).subscribe((response: any[]) => {
      console.log(response)
      this.router.navigateByUrl('/login');
      this.toasterService.pop('success', 'Success', 'password has been reset successfully');
    }, error => {
      console.log(error);
      this.toasterService.pop('error', 'Error', 'link is expired');
    })

  }


}
