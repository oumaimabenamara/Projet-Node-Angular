import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { SweetalertService } from '../../services/sweetalert.service';
import jwt_decode from "jwt-decode";


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

  public imagePath;
  imgURL: any;
  noPWD = false;
  companyId: any;
  companyRole: any
  file: File;
  showEditButton = false;
  editCompanyId: any;
  modalTitle = "Add company";
  data: any[];
  searchText: any;
  submitted = false;
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required]),
    // companyPhoto: new FormControl ('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl('admin', [Validators.required]),
  });

  constructor(private companyService: CompanyService, private toasterService: ToasterService, private sweetalert: SweetalertService) { }

  ngOnInit(): void {
    this.listOfCompanies();
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decoded: any = jwt_decode(token);
      // console.log(decoded);
      this.companyId = decoded.companyId;
      this.companyRole = decoded.role;
    }
  }

  listOfCompanies() {
    this.companyService.getAllCompanies().subscribe((response: any[]) => {
      this.data = response;
    }), error => {
      console.log('error');
    }
  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    const reader = new FileReader();
    this.imagePath = this.file;
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  showModalAdd() {
    this.noPWD = false;
    this.showEditButton = false;
    this.modal.show();
    this.modalTitle = "Add company";
  }

  showModalEdit(id: any) {
    this.noPWD = true;
    this.showEditButton = true;
    this.modal.show();
    this.modalTitle = "Edit company";
    this.editCompanyId = id;
    this.companyService.getCompanyById(this.editCompanyId).subscribe((response: any) => {
      this.companyForm.patchValue(response);
    }, error => {
      console.log(error);
    })
  }

  hideModal() {
    this.modal.hide();
    this.companyForm.reset();
    this.imagePath = null;
    this.imgURL = null;
    this.file = null;
  }

  addCompanyFunction() {
    this.noPWD = false;
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.companyForm.value).forEach(key => {
      formData.append(key, this.companyForm.value[key]);
    });
    formData.append('image', this.file, this.file.name);

    this.companyService.addCompany(formData).subscribe(response => {
      this.imagePath = null;
      this.imgURL = null;
      this.file = null;
      this.submitted = false;
      this.listOfCompanies();
      this.companyForm.reset();
      this.hideModal();
      this.ngOnInit();
      this.toasterService.pop('success', 'Success', 'Company added successfully');
    }, error => {
      console.log(error);
    })
  }

  deleteCompany(id: any) {
    this.sweetalert.confirmDialogue('company').then((result) => {
      if (result.value) {
        this.companyService.deleteCompanyById(id).subscribe((response: any) => {
          this.ngOnInit();
          this.toasterService.pop('success', 'Success', 'Company deleted successfully');
        }, error => {
          console.log(error);
        })
      }
    })
  }

  editCompany() {
    this.noPWD = true;
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.companyForm.value).forEach(key => {
      if (key !== 'password') {
        formData.append(key, this.companyForm.value[key]);
      }
    });
    formData.append('image', this.file, this.file.name);

    this.companyService.editCompanyById(this.editCompanyId, formData).subscribe((response: any) => {
      this.imagePath = null;
      this.imgURL = null;
      this.file = null;
      this.ngOnInit();
      this.hideModal();
      this.companyForm.reset();
      this.toasterService.pop('success', 'Success', 'Company edited successfully');
      this.submitted = false;
    }, error => {
      console.log(error);
    })
  }

}
