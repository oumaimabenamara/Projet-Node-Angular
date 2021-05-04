import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  myID: any;
  submitted = false;
  editEventForm: FormGroup = new FormGroup({
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

  constructor(private router: Router, private eventService : EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.myID = this.activatedRoute.snapshot.params['item.id'];
    this.editEventFunction();
  }


  editEventFunction()
  {
    this.eventService.getEventById(this.myID).subscribe((response: any)=>
    {
      // console.log(response);
      this.editEventForm.patchValue(response);
    }, error=>{
      console.log(error);
    })
  }


  saveFunction()
  {
    this.submitted = true;
    if (this.editEventForm.invalid)
    {
      return;
    }
    this.eventService.editEventById(this.myID, this.editEventForm.value).subscribe((response: any)=>{
      // console.log(response);
      this.editEventForm.reset();
      this.submitted= false;
      this.router.navigate(['event-list']);
    }, error=>{
      console.log(error);
    })
  }
  // cancelFunction()
  // {
  //   this.editEventForm.reset();
  //   this.router.navigate(['event-list']);
  // }

}
