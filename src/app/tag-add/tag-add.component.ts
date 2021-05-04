import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent implements OnInit {

  submitted = false;
  addTagForm: FormGroup = new FormGroup({

    tagName: new FormControl('', [Validators.required]),
    tagDescription: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit(): void {

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

    }, error => {
      console.log(error);
    })
  }

}
