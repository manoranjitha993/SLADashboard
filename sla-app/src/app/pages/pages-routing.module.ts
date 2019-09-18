import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlaInputComponent } from './sla-input/sla-input.component';

import { DbdatasComponent } from './dbdatas/dbdatas.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
    {
      path: 'sla-input',
      component: SlaInputComponent,
    },
    {
      path:'dbdatas',
      component: DbdatasComponent,
    },

    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
 }
