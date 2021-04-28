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

  allExistingUsers: any[];
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

    this.loginRegisterService.getAllUsers().subscribe((response: any[]) => {
      this.allExistingUsers = response;
    }, error => {
      console.log(error);
    })

    const found = this.allExistingUsers.find(user => user.email === this.myRegisterForm.value.email)

    if (!found) {
      this.loginRegisterService.addUser(this.myRegisterForm.value).subscribe((response: any) => {
        this.myRegisterForm.reset();
        this.submitted = false;
        alert('account created');
        this.route.navigate(['/mylogin'])
      }, error => {
        console.log(error);
      })
    }
    else {
      alert('email already in use');
    }

  }

}
