import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  // @ViewChild('primaryModal') public primaryModal: ModalDirective;

  eventsArray: any[];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((response: any[] )=>{
      this.eventsArray = response;
    }, error=>{
      console.log(error);
    })
  }

  deleteEventFunction(id)
  {
    this.eventService.deleteEventById(id).subscribe((response: any)=>{
      this.ngOnInit();
    }, error=>{
      console.log(error);
    })
  }


}
