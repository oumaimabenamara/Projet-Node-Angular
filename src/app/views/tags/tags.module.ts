import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { DataTableModule } from 'angular2-datatable';

import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    TagsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,
    DataTableModule,
    FormsModule,



  ]
})
export class TagsModule { }
