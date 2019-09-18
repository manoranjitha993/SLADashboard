import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaButtonComponent } from './sla-button.component';

describe('SlaButtonComponent', () => {
  let component: SlaButtonComponent;
  let fixture: ComponentFixture<SlaButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
