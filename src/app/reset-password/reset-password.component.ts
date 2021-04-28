import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pwNewConfirmationValidator } from '../validators/passwordConfirmationValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  submitted = false;
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  }, {
    validators: [pwNewConfirmationValidator]
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.router.navigateByUrl('/login');



    // appel service company
  }


}
