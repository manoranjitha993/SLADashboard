import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../../../models/dashboard-item.model';
import { DashboardSla } from '../../../models/dashboard-sla.model';

@Component({
  selector: 'dashboard-tier',
  templateUrl: './dashboard-tier.component.html',
  styleUrls: ['./../dashboard-template.component.scss']
})
export class DashboardTierComponent implements OnInit {
  @Input() dashboardItems: DashboardItem[] = [];
  @Input() dashboardSla: DashboardSla;
  @Input() month1: string;
  @Input() month2: string;
  @Input() month3: string;

  constructor() {}

  ngOnInit() {
  }

}
