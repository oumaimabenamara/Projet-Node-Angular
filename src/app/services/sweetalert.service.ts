import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  confirmDialogue(name: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this ${name}`,
      icon: 'warning',
      confirmButtonColor: '#4dbd74',
      cancelButtonColor: '#f86c6b',
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i> Yes, delete it!',
      cancelButtonText: '<i class="fa fa-times" aria-hidden="true"></i> No, keep it'
    })
  }
}
