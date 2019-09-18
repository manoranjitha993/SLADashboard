import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTierComponent } from './dashboard-tier.component';

describe('DashboardTierComponent', () => {
  let component: DashboardTierComponent;
  let fixture: ComponentFixture<DashboardTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
