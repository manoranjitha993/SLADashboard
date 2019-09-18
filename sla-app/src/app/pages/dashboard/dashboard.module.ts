import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardTierComponent } from './dashboard-tier/dashboard-tier.component';
import { DashboardSecurityComponent } from './dashboard-security/dashboard-security.component';
import { DashboardQualityComponent } from './dashboard-quality/dashboard-quality.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardTierComponent,
    DashboardSecurityComponent,
    DashboardQualityComponent
  ],
})
export class DashboardModule { }
