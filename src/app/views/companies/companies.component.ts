import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ThemeService } from 'ng2-charts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { SweetalertService } from '../../services/sweetalert.service';


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

  showEditButton = false;
  editCompanyId: any;
  modalTitle = "Add company";
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

  constructor(private companyService: CompanyService, private toasterService: ToasterService, private sweetalert: SweetalertService) { }

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

  showModalAdd()
  {
    this.showEditButton = false;
    this.modal.show();
    this.modalTitle = "Add company";
  }

  showModalEdit(id: any)
  {
    this.showEditButton = true;
    this.modal.show();
    this.modalTitle = "Edit company";
    this.editCompanyId = id;
    this.companyService.getCompanyById(this.editCompanyId).subscribe((response: any)=>{
      this.companyForm.patchValue(response);
    }, error=>{
      console.log(error);
    })
  }

  hideModal()
  {
    this.modal.hide();
    this.companyForm.reset();
  }

  addCompanyFunction()
  {
    this.submitted = true;
    if(this.companyForm.invalid)
    {
      return ;
    }
  
    this.companyService.addCompany(this.companyForm.value).subscribe(response=>{
      this.submitted = false;
      this.listOfCompanies();
      // this.companyForm.reset();
      this.hideModal();
      this.toasterService.pop('success', 'Success', 'User added successfully');
    }, error=>{
      console.log(error);
    })
  }

  deleteCompany(id: any) {
    this.sweetalert.confirmDialogue('company').then((result) => {
      if (result.value) {
        this.companyService.deleteCompanyById(id).subscribe((response: any) => {
          this.ngOnInit();
        }, error => {
          console.log(error);
        })
      }
    })
  }

  editCompany()
  {
    this.companyService.editCompanyById(this.editCompanyId, this.companyForm.value).subscribe((response: any)=>{
      this.ngOnInit();
      this.hideModal();
      // this.companyForm.reset();
      this.toasterService.pop('success', 'Success', 'User edited successfully');
    }, error=>{
      console.log(error);
    })
  }

}
