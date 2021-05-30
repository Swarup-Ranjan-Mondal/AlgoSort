import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallsDisplayComponent } from './balls-display.component';

describe('BallsDisplayComponent', () => {
  let component: BallsDisplayComponent;
  let fixture: ComponentFixture<BallsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
