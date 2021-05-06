import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ThemeService } from 'ng2-charts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: [
    './companies.component.css',
    '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompaniesComponent implements OnInit {

  @ViewChild('modal') modal: ModalDirective;

  listCompanies: any[];
  submitted = false;
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl ('', [Validators.required]),
    companyDescription: new FormControl ('', [Validators.required]),
    // photo: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl ('admin', [Validators.required]),
  });

  constructor(private companyService: CompanyService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.listOfCompanies();
  }

  listOfCompanies()
  {
    this.companyService.getAllCompanies().subscribe((response: any[]) =>{
      this.listCompanies = response;
    }), error => {
      console.log('error');
    }
  }

  showModal()
  {
    this.modal.show();
  }

  hideModal()
  {
    this.modal.hide();
  }

  addCompany()
  {
    this.submitted = true;
    if(this.companyForm.invalid)
    {
      return ;
    }
  
    this.companyService.addCompany(this.companyForm.value).subscribe(response=>{
      this.companyForm.reset();
      this.submitted = false;
      this.listOfCompanies();
      this.toasterService.pop('success', 'Success Toaster', 'This is toaster description');
    }, error=>{
      console.log(error);
    })

    this.hideModal();
  }

  editCompany(id: any)
  {
    this.companyService.getCompanyById(id).subscribe(response=>{
      this.companyForm.patchValue(response);
      this.showModal();
    }, error=>{
      console.log(error);
    })
  }

}
