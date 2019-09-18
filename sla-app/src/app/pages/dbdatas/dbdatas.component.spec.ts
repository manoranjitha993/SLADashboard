import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbdatasComponent } from './dbdatas.component';

describe('DbdatasComponent', () => {
  let component: DbdatasComponent;
  let fixture: ComponentFixture<DbdatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbdatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbdatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
