import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit {
  @Input() ballNo!: number;
  @Input() radius!: number;
  @Input() centerX!: number;
  @Input() centerY!: number;
  @Input() scaleX!: number;
  @Input() scaleY!: number;

  widthExpn!: string;
  heightExpn!: string;
  topExpn!: string;
  leftExpn!: string;

  ngOnInit(): void {
    this.widthExpn = `${(this.radius * 2) / 30}em`;
    this.heightExpn = `${(this.radius * 2) / 30}em`;
    this.leftExpn = `${this.centerX}px - ${this.widthExpn} / 2`;
    this.topExpn = `${this.centerY}px - ${this.heightExpn} / 2`;
  }
}
