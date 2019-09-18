import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaEntryComponent } from './sla-entry.component';

describe('SlaEntryComponent', () => {
  let component: SlaEntryComponent;
  let fixture: ComponentFixture<SlaEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
