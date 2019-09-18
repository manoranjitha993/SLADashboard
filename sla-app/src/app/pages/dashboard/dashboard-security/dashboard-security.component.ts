import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../../../models/dashboard-item.model';
import { DashboardItemMonthwise } from '../../../models/dashboard-item-monthwise.model';
import { DashboardSla } from '../../../models/dashboard-sla.model';

@Component({
  selector: 'dashboard-security',
  templateUrl: './dashboard-security.component.html',
  styleUrls: ['./../dashboard-template.component.scss']
})
export class DashboardSecurityComponent implements OnInit {
  @Input() dashboardItems: DashboardItemMonthwise[];
  @Input() dashboardSla: DashboardSla;
  @Input() month1: string;
  @Input() month2: string;
  @Input() month3: string;

  constructor() { }

  ngOnInit() {
  }

}
