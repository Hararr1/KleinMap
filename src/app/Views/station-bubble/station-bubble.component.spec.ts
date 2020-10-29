import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationBubbleComponent } from './station-bubble.component';

describe('StationBubbleComponent', () => {
  let component: StationBubbleComponent;
  let fixture: ComponentFixture<StationBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
