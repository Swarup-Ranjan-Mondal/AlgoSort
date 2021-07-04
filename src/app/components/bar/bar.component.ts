import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() barNo!: number;
  @Input() value!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() color!: string;

  fontSize: number = 16;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.width) {
      if (this.width >= 2 * 16) {
        this.fontSize = 16;
      } else if (this.width >= 2 * 12) {
        this.fontSize = Math.round((this.width * 10) / 2) / 10;
      } else {
        this.fontSize = 0;
      }
    }
  }
}
