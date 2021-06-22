import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToasterModule } from 'angular2-toaster';
import { DataTableModule } from 'angular2-datatable';
import { SearchPipe } from './search.pipe';
import { SelectModule } from 'ng-select';


@NgModule({
  declarations: [
    EventsComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ToasterModule,
    DataTableModule,
    SelectModule
  ]
})
export class EventsModule { }
