import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SlaInputComponent } from './sla-input/sla-input.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SlaEntryComponent } from './sla-input/sla-entry/sla-entry.component';
import { MessageModalComponent } from './sla-input/message-modal/message-modal.component';
import { SlaButtonComponent } from './sla-input/sla-button/sla-button.component';
import { DbdatasComponent } from './dbdatas/dbdatas.component';



const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    SlaInputComponent,
    SlaEntryComponent,
    MessageModalComponent,
    SlaButtonComponent,
    DbdatasComponent,

 
  ],
  entryComponents: [
    SlaInputComponent,
    SlaEntryComponent,
    SlaButtonComponent,
    MessageModalComponent,
  ],
})
export class PagesModule {
}
