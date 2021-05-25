import { Component, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private route: Router, private toasterService: ToasterService, private logoutService: LogoutService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logoutFunction()
  {
    this.logoutService.Logout().subscribe((response: any) =>{
      localStorage.removeItem('token');
      this.route.navigate(['/login'])
      this.toasterService.pop('success', 'Success', 'logged out successfully');
    }), error => {
      console.log('error');
    }
  }
}
