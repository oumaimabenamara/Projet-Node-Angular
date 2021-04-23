import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-register',
  templateUrl: './my-register.component.html',
  styleUrls: ['./my-register.component.css']
})
export class MyRegisterComponent implements OnInit {

  submitted = false;
  myRegisterForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor() { }

  ngOnInit(): void {
  }

  submit()
  {
    this.submitted = true;
    if(this.myRegisterForm.invalid)
    {
      return ;
    }
  }

}
