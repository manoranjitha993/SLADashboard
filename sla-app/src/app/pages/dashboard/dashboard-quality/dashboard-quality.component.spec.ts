import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQualityComponent } from './dashboard-quality.component';

describe('DashboardQualityComponent', () => {
  let component: DashboardQualityComponent;
  let fixture: ComponentFixture<DashboardQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
