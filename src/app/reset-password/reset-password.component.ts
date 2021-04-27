import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    const newpass = this.resetPasswordForm.value.newPassword;
    const newconfirmpass = this.resetPasswordForm.value.confirmNewPassword;
    this.submitted = true;
    if (newpass === newconfirmpass) {


      console.log(newpass);
      console.log(newconfirmpass);


      this.router.navigateByUrl('/login');

    }
    else {

      this.resetPasswordForm.invalid;
    }

    // appel service company
  }


}
