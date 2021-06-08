import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TagService } from '../../services/tag.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css', '../../../scss/vendors/toastr/toastr.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  error: any;
  public data: any;
  public filterQuery = '';
  showEditButton = false;
  modalTitle = "add tag";
  editTagId: any;
  tagId: any;
  // data: any[];
  submitted = false;
  addTagForm: FormGroup = new FormGroup({

    tagName: new FormControl('', [Validators.required]),
    tagDescription: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private tagService: TagService, private sweetalert: SweetalertService, private toasterService: ToasterService) { this.toasterService = toasterService }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe((response: any[]) => {

      this.data = response;
    }, error => {
      console.log(error);
    })
    // this.tagId = this.activatedRoute.snapshot.params['item.id'];
  }


  showModalAdd() {
    this.modal.show();
    this.modalTitle = "Add tag"
    this.showEditButton = false
  };
  
  showModalEdit(id: any) {
    this.modal.show();
    this.modalTitle = "Edit tag";
    this.editTagId = id;
    this.showEditButton = true
    this.tagService.getTagById(this.editTagId).subscribe((response: any) => {
      // console.log(response);
      this.addTagForm.patchValue(response);
    }, error => {
      console.log(error);
    })
  };

  hideModal() {
    this.modal.hide();
    this.addTagForm.reset();
  }

  deleteTag(id) {
    this.sweetalert.confirmDialogue('tag').then((result) => {
      if (result.value) {
        this.tagService.deleteTagById(id).subscribe((response: any) => {
          this.ngOnInit();
          this.toasterService.pop('success', 'Success', 'Tag deleted successfully');
        }, error => {
          console.log(error);
        })
      }
    })

  };

  editTag() {
    this.submitted = true;
    if (this.addTagForm.invalid) {
      return;
    }

    this.tagService.editTagById(this.editTagId, this.addTagForm.value).subscribe((response: any) => {
      // console.log(response);
      this.ngOnInit()
      this.modal.hide();
      this.addTagForm.reset();
      // this.modal.show();
      this.toasterService.pop('success', 'Success', 'Tag edited successfully');
      this.submitted = false;
    }, error => {
      console.log(error);
    })
  }

  addTagFunction() {
    this.submitted = true;
    if (this.addTagForm.invalid) {
      return;
    }
    this.tagService.addTag(this.addTagForm.value).subscribe(response => {
      // console.log(response);
      this.addTagForm.reset();
      this.submitted = false;
      this.ngOnInit()
      this.modal.hide();
      this.toasterService.pop('success', 'Success', 'Tag added succusfuly');
    }, error => {
      console.log(error);
    })
  }



}
