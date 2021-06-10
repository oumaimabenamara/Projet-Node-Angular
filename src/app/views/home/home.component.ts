import { Component, OnInit } from '@angular/core';
import { HomenologinService } from '../../services/homenologin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eventsArray: any[];
  constructor(private homenologinService: HomenologinService) { }

  ngOnInit(): void {

    this.listOfEvents();
    console.log(this.eventsArray);


  }


  listOfEvents() {
    this.homenologinService.getAllEvents().subscribe((response: any[]) => {
      this.eventsArray = response;
    }, error => {
      console.log(error);
    })
  }




}
