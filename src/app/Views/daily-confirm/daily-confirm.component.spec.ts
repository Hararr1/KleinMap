import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyConfirmComponent } from './daily-confirm.component';

describe('DailyConfirmComponent', () => {
  let component: DailyConfirmComponent;
  let fixture: ComponentFixture<DailyConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
