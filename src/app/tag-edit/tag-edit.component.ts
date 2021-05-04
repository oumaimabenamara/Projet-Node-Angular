import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  tagId: any;
  submitted = false;
  editTagForm: FormGroup = new FormGroup({
    tagName: new FormControl('', [Validators.required]),
    tagDescription: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private tagService: TagService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagId = this.activatedRoute.snapshot.params['item.id'];
    this.editTag();
  }

  editTag() {
    this.tagService.getTagById(this.tagId).subscribe((response: any) => {
      // console.log(response);
      this.editTagForm.patchValue(response);
    }, error => {
      console.log(error);
    })
  }

  saveTagChanges() {
    this.submitted = true;
    if (this.editTagForm.invalid) {
      return;
    }

    this.tagService.editTagById(this.tagId, this.editTagForm.value).subscribe(response => {
      // console.log(response);
      this.editTagForm.reset();
      this.submitted = false;
      this.router.navigate(['tag-list'])
    }, error => {
      console.log(error);
    })
  }

  //   cancelTagChanges() {
  //     this.editTagForm.reset();
  //     this.router.navigate(['tag-list'])
  //   }

}
