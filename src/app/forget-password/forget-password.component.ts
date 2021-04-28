import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  allExistingUsers: any[];
  submitted = false;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private router: Router, private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
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
