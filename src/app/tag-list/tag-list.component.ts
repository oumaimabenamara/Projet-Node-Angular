import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  tagsArray: any[];
  submitted = false;
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit(): void {

    this.tagService.getAllTags().subscribe((response: any[]) => {

      this.tagsArray = response;
    }, error => {
      console.log(error);
    })
  }
  deleteTag(id) {

    this.tagService.deleteTagById(id).subscribe((response: any) => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
  }
}
