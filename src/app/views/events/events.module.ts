import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
// import { AdvancedFormsComponent } from '../forms/advanced-forms/advanced-forms.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    // AdvancedFormsComponent,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToasterModule
  ]
})
export class EventsModule { }
