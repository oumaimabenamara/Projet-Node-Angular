import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';
import { pwConfirmationValidator } from '../validators/passwordConfirmationValidator';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-register',
  templateUrl: './my-register.component.html',
  styleUrls: ['./my-register.component.css',
  '../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyRegisterComponent implements OnInit {


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
  constructor(private route: Router, private loginRegisterService: LoginRegisterService, private toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
    if (this.myRegisterForm.invalid) {
      return;
    }
    this.loginRegisterService.registerCompany(this.myRegisterForm.value).subscribe((response: any) => {
      this.myRegisterForm.reset();
      this.submitted = false;
      this.toasterService.pop('success', 'Success', 'account created successfully');
      this.route.navigate(['/login'])
    }, error => {
      console.log(error);
      this.toasterService.pop('error', 'Error', 'Email is already in use');
    })
  }
}
