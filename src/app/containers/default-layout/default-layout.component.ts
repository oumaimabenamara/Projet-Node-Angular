import { Component, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../services/event.service';
import { DashboardService } from '../../services/dashboard.service';


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

  dashboardData: any;
  constructor(private route: Router, private dashboardService: DashboardService, private toasterService: ToasterService, private logoutService: LogoutService, @Inject(DOCUMENT) _document?: any) {

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


  ngOnInit()
  {
    this.showStats();
  }
  showStats() {
    this.dashboardService.showStat().subscribe((response: any[]) => {
      this.dashboardData = response;
    }), error => {
      console.log('error');
    }
  }

  logoutFunction() {
    this.logoutService.Logout().subscribe((response: any) => {
      localStorage.removeItem('token');
      this.route.navigate(['/login'])
      this.toasterService.pop('success', 'Success', 'logged out successfully');
    }), error => {
      console.log('error');
    }
  }
}
