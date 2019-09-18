import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardItem } from '../../models/dashboard-item.model';
import { DashboardSla } from '../../models/dashboard-sla.model';
import { DashboardType } from '../../models/dashboard-type.model';
import { DashboardItemMonthwise } from '../../models/dashboard-item-monthwise.model';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  //page:string = 'dbdatas'; //i need to add this line in db datas instaed of view-dyear-comment it should be dbdatas
  space: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  dashboard = new Dashboard;
  ams01Items: DashboardItem[];
  ams02Items: DashboardItem[];
  ams03Items: DashboardItem[];
  ams04Items: DashboardItem[];
  ams05Items: DashboardItem[];
  ams06Items: DashboardItem[];
  ams07Items: DashboardItem[];
  ams01: DashboardSla;
  ams02: DashboardSla;
  ams03: DashboardSla;
  ams04: DashboardSla;                                                                                                                                           
  ams05: DashboardSla;
  ams06: DashboardSla;
  ams07: DashboardSla;
  selectedId: number;                  
  selectedType: DashboardType;             
  dashoardTypes: DashboardType[] = [];  

constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.selectedId = 1;
    this.selectedType = new DashboardType();          
    this.ams01 = new DashboardSla();           
    this.ams02 = new DashboardSla();  
    this.ams03 = new DashboardSla();
    this.ams04 = new DashboardSla();
    this.ams05 = new DashboardSla();
    this.ams06 = new DashboardSla();
    this.ams07 = new DashboardSla();               
    
    this.dashboardService.getDashboardTypes().subscribe(result => {
      this.dashoardTypes = result as DashboardType[];
      this.selectedId = 1;
      this.selectedType = this.dashoardTypes[this.selectedId];
    });//till this
    this.getDashboardData(this.selectedId);
  }

  selectDashboard(value) {
    this.getDashboardData(value);
  }

  getDashboardData(dashboardId): void {
    this.dashboardService.getDashboardData(dashboardId).subscribe(result => {
      this.dashboard = result as Dashboard;
      if (this.dashboard != null) {
        if (this.dashboard.DashboardItems != null) {
          this.ams01Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 1);
          this.ams02Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 2);
          this.ams03Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 3);
          this.ams04Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 4);
          this.ams05Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 5);
          this.ams06Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 6);
          this.ams07Items = this.dashboard.DashboardItems.filter(item => item.SLAId === 7);
        }
       
        if (this.dashboard.DashboardSlas != null) {
          this.ams01 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 1)[0];
          this.ams02 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 2)[0];
          this.ams03 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 3)[0];
          this.ams04 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 4)[0];
          this.ams05 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 5)[0];
          this.ams06 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 6)[0];
          this.ams07 = this.dashboard.DashboardSlas.filter(item => item.SLAId === 7)[0];
        }
      }
    }, error => console.error(error));

  }
}
