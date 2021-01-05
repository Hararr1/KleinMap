import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateTableComponent } from './state-table.component';

describe('StateTableComponent', () => {
  let component: StateTableComponent;
  let fixture: ComponentFixture<StateTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});