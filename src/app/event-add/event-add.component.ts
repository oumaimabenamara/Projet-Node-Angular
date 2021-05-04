import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: [
  './event-add.component.css',
  '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventAddComponent implements OnInit {

  // Datepicker

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  // Timepicker

  public hstep: number = 1;
  public mstep: number = 15;
  public ismeridian: boolean = true;
  public isEnabled: boolean = true;

  public mytime: Date = new Date();
  public options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };


  submitted = false;
  addEventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    // eventPhoto: new FormControl('', [Validators.required]),
    // eventTags: new FormControl('', [Validators.required]),
    eventDescription: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    numberOfTickets: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private eventService: EventService) { }


  ngOnInit(): void {
  }

  addEventFunction()
  {
    this.submitted = true;
    if(this.addEventForm.invalid)
    {
      return ;
    }
  
    this.eventService.addEvent(this.addEventForm.value).subscribe(response=>{
      this.addEventForm.reset();
      this.submitted = false;
    }, error=>{
      console.log(error);
    })

  }

}
