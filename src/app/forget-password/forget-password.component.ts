import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


  submitted = false;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.router.navigateByUrl('/resetpassword');
    // appel service company
  }

}
