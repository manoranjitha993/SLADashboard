import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { DashboardType } from '../../../models/dashboard-type.model';
import { Dashboard } from '../../../models/dashboard.model';
import { DashboardService } from '../../../services/dashboard.service';
import { UserService } from '../../../services/user.service';
import { DashboardComponent } from '../../../pages/dashboard/dashboard.component';
import { DashboardItem } from '../../../models/dashboard-item.model';
import { DashboardItemMonthwise } from '../../../models/dashboard-item-monthwise.model';
import { DashboardSla } from '../../../models/dashboard-sla.model';
import { Router } from '@angular/router';

@Component({
  providers: [DashboardComponent],
  selector: 'sla-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  page: string = 'dashboard';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  selectedId: number;
  selectedType: DashboardType;
  dashoardTypes: DashboardType[] = [];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private dashboardService: DashboardService,
              private dashboardComponent: DashboardComponent,
              private modalService : NgbModal,
      
    private router: Router) {
  }

  ngOnInit() {
    this.dashboardService.getDashboardTypes().subscribe(result => {
      this.dashoardTypes = result as DashboardType[];
    });

    this.userService.getUserData().subscribe(result => {
      this.user = result;
    });
  }

  selectDashboard(value) {
    this.dashboardComponent = new DashboardComponent(this.dashboardService);
    this.dashboardComponent.getDashboardData(value);
  

  }

  menuClick(selectedPage) {
    this.page = selectedPage;
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

 
}
