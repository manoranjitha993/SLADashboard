import { Component } from '@angular/core';

@Component({
  selector: 'sla-pages',
  template: `
    <sla-layout>
      <router-outlet></router-outlet>
    </sla-layout>
  `,
})
export class PagesComponent {

  menu = [];
}
