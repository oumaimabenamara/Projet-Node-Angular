import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomenologinService } from '../../services/homenologin.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @ViewChild('modal') modal: ModalDirective;
  error: any;
  EVENT: any;
  ID: any;
  submitted = false;

  getTicketsForm: FormGroup = new FormGroup({
    userFirstName: new FormControl('', [Validators.required]),
    userLDescription: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private route: ActivatedRoute, private router: Router, private homenologinService: HomenologinService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.EventsById();
    });
  }

  EventsById() {
    this.homenologinService.getEventById(this.ID).subscribe((response: any) => {
      this.EVENT = response;
    }, error => {
      console.log(error);
    })
  }

}
