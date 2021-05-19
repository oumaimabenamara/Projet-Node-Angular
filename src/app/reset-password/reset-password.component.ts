import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { pwNewConfirmationValidator } from '../validators/passwordConfirmationValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  companyId: any;
  submitted = false;
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  }, {
    validators: [pwNewConfirmationValidator]
  });

  constructor(private router: Router, private loginRegisterService: LoginRegisterService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['found'];
  }

  submit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loginRegisterService.resetPassword(this.resetPasswordForm.value.newPassword).subscribe((response: any[]) => {
      console.log(response)
    }, error => {
      console.log(error);
    })
    this.router.navigateByUrl('/login');
  }


}
