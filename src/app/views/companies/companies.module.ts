import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { DataTableModule } from 'angular2-datatable';
// import { DataFilterPipe } from '../tables/datatable/datafilterpipe';


@NgModule({
  declarations: [
    CompaniesComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ToasterModule,
    DataTableModule,
  ]
})
export class CompaniesModule { }
