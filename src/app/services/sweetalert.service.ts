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
      text: `You will not be able to recover this imaginary ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
  }
}
