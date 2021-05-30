import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-partition-wall',
  templateUrl: './partition-wall.component.html',
  styleUrls: ['./partition-wall.component.scss'],
})
export class PartitionWallComponent implements AfterViewInit {
  @Input() centerX!: number;
  @Input() centerY!: number;

  widthInPixels: number = 2;
  heightInEm: number = 4;

  leftExpn!: string;
  topExpn!: string;

  ngAfterViewInit(): void {
    this.leftExpn = `${this.centerX}px - ${this.widthInPixels / 2}px`;
    this.topExpn = `${this.centerY}px - ${this.heightInEm / 2}em`;
  }
}
