import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../services/event.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: [
    './events.component.css',
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/ng-select/ng-select.scss',
    '../../../scss/vendors/toastr/toastr.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EventsComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  // Datepicker

  // minDate = new Date(2017, 5, 10);
  // maxDate = new Date(2018, 9, 15);

  // bsValue: Date = new Date();
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  // Timepicker

  // public hstep: number = 1;
  // public mstep: number = 15;
  // public ismeridian: boolean = true;
  // public isEnabled: boolean = true;

  // public mytime: Date = new Date();
  // public options: any = {
  //   hstep: [1, 2, 3],
  //   mstep: [1, 5, 10, 15, 25, 30]
  // };




  // myID: any;
  // showEditButton = false;
  eventsArray: any[];
  submitted = false;
  addEditEventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    // photo: new FormControl('', [Validators.required]),
    // tags: new FormControl('', [Validators.required]),
    eventDescription: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    numberOfTickets: new FormControl('', [Validators.required]),
    // eventType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(private eventService : EventService, private toasterService: ToasterService, private sweetalert: SweetalertService) { }

  @ViewChild('modal') modal: ModalDirective;

  ngOnInit(): void {
    this.  listOfEvents();
  }


  listOfEvents()
  {
    this.eventService.getAllEvents().subscribe((response: any[] )=>{
      this.eventsArray = response;
    }, error=>{
      console.log(error);
    })
  }

  showModal()
  {
    this.modal.show();
  }

  hideModal()
  {
    this.modal.hide();
  }


  addEvent()
  {
    this.submitted = true;
    if(this.addEditEventForm.invalid)
    {
      return ;
    }
  
    this.eventService.addEvent(this.addEditEventForm.value).subscribe(response=>{
      this.addEditEventForm.reset();
      this.submitted = false;
      this.listOfEvents();
      // this.toasterService.pop('success', 'Success Toaster', 'This is toaster description');
    }, error=>{
      console.log(error);
    })

    this.hideModal();
  }

  deleteCompany(id: any) {
    this.sweetalert.confirmDialogue('event').then((result) => {
      if (result.value) {
        this.eventService.deleteEventById(id).subscribe((response: any) => {
          this.ngOnInit();
        }, error => {
          console.log(error);
        })
      }
    })
  }

  editEvent(id: any)
  {
    this.eventService.getEventById(id).subscribe(response=>{
      this.addEditEventForm.patchValue(response);
      this.showModal();
    }, error=>{
      console.log(error);
    })
  }


  // addEventFunction()
  // {
  //   this.submitted = true;
  //   if(this.addEditEventForm.invalid)
  //   {
  //     return ;
  //   }
  
  //   this.eventService.addEvent(this.addEditEventForm.value).subscribe(response=>{
  //     this.addEditEventForm.reset();
  //     this.submitted = false;
  //   }, error=>{
  //     console.log(error);
  //   })

  // }

  // deleteEventFunction(id)
  // {
  //   this.eventService.deleteEventById(id).subscribe((response: any)=>{
  //     this.ngOnInit();
  //   }, error=>{
  //     console.log(error);
  //   })
  // }

  // editEventFunction()
  // {
  //   this.showEditButton = true;
  //   this.myID = this.activatedRoute.snapshot.params['item.id'];
  //   this.eventService.getEventById(this.myID).subscribe((response: any)=>
  //   {
  //     // console.log(response);
  //     this.addEditEventForm.patchValue(response);
  //   }, error=>{
  //     console.log(error);
  //   })
  // }


  // saveEventChanges()
  // {
  //   this.submitted = true;
  //   if (this.addEditEventForm.invalid)
  //   {
  //     return;
  //   }
  //   this.eventService.editEventById(this.myID, this.addEditEventForm.value).subscribe((response: any)=>{
  //     // console.log(response);
  //     this.addEditEventForm.reset();
  //     this.submitted= false;
  //     this.showEditButton = false;
  //     this.router.navigate(['event-list']);
  //   }, error=>{
  //     console.log(error);
  //   })
  // }
  // cancelEventChanges()
  // {
  //   this.addEditEventForm.reset();
  //   this.router.navigate(['event-list']);
  //   this.showEditButton = false;
  // }

}
