import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionWallComponent } from './partition-wall.component';

describe('PartitionWallComponent', () => {
  let component: PartitionWallComponent;
  let fixture: ComponentFixture<PartitionWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartitionWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
