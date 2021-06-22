import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomenologinService } from '../../services/homenologin.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationTicketService } from '../../services/reservation-ticket.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css',
  '../../../scss/vendors/toastr/toastr.scss'],
encapsulation: ViewEncapsulation.None,
})
export class EventDetailsComponent implements OnInit {

  @ViewChild('modal') modal: ModalDirective;
  error: any;
  EVENT: any;
  ID: any;
  submitted = false;

  getTicketsForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private route: ActivatedRoute, private router: Router, private homenologinService: HomenologinService, private reservationTicketService:ReservationTicketService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.EventsById();
    });
  }

  EventsById() {
    this.homenologinService.getEventById(this.ID).subscribe((response: any) => {
      this.EVENT = response;
      console.log(this.EVENT);
    }, error => {
      console.log(error);
    })
  }

  getTicketFunction()
  {
    this.submitted = true;
    if (this.getTicketsForm.invalid) {
      return;
    }

    this.reservationTicketService.sendReservationTicket(this.ID, this.getTicketsForm.value).subscribe((response: any) => {
      this.getTicketsForm.reset();
      this.submitted = false;
      this.ngOnInit();
      this.toasterService.pop('success', 'Check your e-mail', 'Ticket sent successfully');
    }, error => {
      console.log(error);
    })


  }

}
