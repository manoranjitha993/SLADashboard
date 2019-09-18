import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaInputComponent } from './sla-input.component';

describe('SlaInputComponent', () => {
  let component: SlaInputComponent;
  let fixture: ComponentFixture<SlaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
