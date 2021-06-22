import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { IOption } from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../services/event.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { TagService } from '../../services/tag.service';

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

  // myID: any;

  allTags: any;
  public imagePath;
  imgURL: any;
  file: File = null;
  showEditButton = false;
  editEventId: any;
  modalTitle = "Add Event";
  data: any[];
  searchText: any;
  submitted = false;
  addEditEventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    // eventPhoto: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    eventDescription: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    numberOfTickets: new FormControl('', [Validators.required]),
    eventType: new FormControl('paid', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });


  // Angular 2 Input Mask
  public dateModel = '';
  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];


  // Datepicker
  // minDate = new Date(2017, 5, 10);
  // maxDate = new Date(2018, 9, 15);
  // bsValue: Date = new Date();
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  
  // Datepicker
  minDate1 = new Date();
  minDate2 = new Date();


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



    // ng2-select
    public AllTags: Array<IOption> = [];
  
    public selectedCountries: Array<string> = [];

  constructor(private eventService: EventService, private toasterService: ToasterService, private sweetalert: SweetalertService, private tagService: TagService) { }

  @ViewChild('modal') modal: ModalDirective;

  ngOnInit(): void {
    this.addEditEventForm.controls.startDate.valueChanges.subscribe(newStartDate =>
    {
      this.minDate2 = new Date(newStartDate)
    })
    
    this.listOfEvents();
    this.tagService.getAllTags().subscribe((response: any[]) => {
      const tagsFormated = response.map( item =>{
        const newObject = {"label": item.tagName, "value": item._id};
        return newObject;
      })
      this.AllTags = tagsFormated;
      // console.log(tagsFormated); 

    }, error => {
      console.log(error);
    })
  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    console.log(this.file.name);

    const reader = new FileReader();
    this.imagePath = this.file;
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  listOfEvents() {
    this.eventService.getAllEvents().subscribe((response: any[]) => {
      this.data = response;
    }, error => {
      console.log(error);
    })
  }

  showModalAdd() {
    this.showEditButton = false;
    this.modal.show();
    this.modalTitle = "Add event";
  }

  showModalEdit(id: any) {
    this.showEditButton = true;
    this.modal.show();
    this.modalTitle = "Edit event";
    this.editEventId = id;
    this.eventService.getEventById(this.editEventId).subscribe((response: any) => {
      response.startDate = new Date(response.startDate);
      response.endDate = new Date(response.endDate);
      this.addEditEventForm.patchValue(response);
    }, error => {
      console.log(error);
    })
  }

  hideModal() {
    this.modal.hide();
    this.addEditEventForm.reset();
    this.imagePath = null;
    this.imgURL = null;
    this.file = null;
  }


  addEventFunction() {
    this.submitted = true;
    if (this.addEditEventForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.addEditEventForm.value).forEach(key => {
      formData.append(key, this.addEditEventForm.value[key]);
    });
    if(this.file !== null)
    {
      // console.log(this.file.name);
      formData.append('image', this.file, this.file.name);
    }


    this.eventService.addEvent(formData).subscribe(response => {
      this.imagePath = null;
      this.imgURL = null;
      this.file = null;
      this.submitted = false;
      this.listOfEvents();
      this.addEditEventForm.reset();
      this.hideModal();
      this.ngOnInit();
      this.toasterService.pop('success', 'Success', 'Event added successfully');
    }, error => {
      console.log(error);
    })
   
  }

  deleteEvent(id: any) {
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

  editEvent() {
    this.submitted = true;
    if (this.addEditEventForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.addEditEventForm.value).forEach(key => {
      formData.append(key, this.addEditEventForm.value[key]);
    });
    if(this.file !== null)
    {
      // console.log(this.file.name);
      formData.append('image', this.file, this.file.name);
    }

    this.eventService.editEventById(this.editEventId, this.addEditEventForm.value).subscribe((response: any) => {
      this.imagePath = null;
      this.imgURL = null;
      this.file = null;
      this.ngOnInit();
      this.hideModal();
      this.addEditEventForm.reset();
      this.toasterService.pop('success', 'Success', 'Event edited successfully');
      this.submitted = false;
    }, error => {
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
