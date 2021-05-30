import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsDisplayComponent } from './bars-display.component';

describe('BarsDisplayComponent', () => {
  let component: BarsDisplayComponent;
  let fixture: ComponentFixture<BarsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
