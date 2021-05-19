import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TagService } from '../../services/tag.service';
import Swal from 'sweetalert2'
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  tagId: any;
  tagsArray: any[];
  submitted = false;
  addTagForm: FormGroup = new FormGroup({

    tagName: new FormControl('', [Validators.required]),
    tagDescription: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private tagService: TagService, private sweetalert: SweetalertService) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe((response: any[]) => {

      this.tagsArray = response;
    }, error => {
      console.log(error);
    })
    // this.tagId = this.activatedRoute.snapshot.params['item.id'];

  }
  deleteTag(id) {
    this.sweetalert.confirmDialogue('tag').then((result) => {
      if (result.value) {
        this.tagService.deleteTagById(id).subscribe((response: any) => {
          this.ngOnInit();
        }, error => {
          console.log(error);
        })
      }
    })

  };
  editTag(id: any) {
    this.tagService.editTagById(id, this.addTagForm.value).subscribe((response: any) => {
      // console.log(response);
      this.addTagForm.patchValue(response);
      this.ngOnInit()
      this.modal.show();
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

    }, error => {
      console.log(error);
    })
  }
  showModal() {
    this.modal.show();
  };
  hideModal() {
    this.modal.hide();

  }


}
