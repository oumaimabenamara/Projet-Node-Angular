import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TagsModule { }
