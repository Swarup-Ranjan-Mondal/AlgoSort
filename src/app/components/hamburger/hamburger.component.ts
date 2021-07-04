import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '.hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent implements OnInit {
  @Input() isCrossed!: boolean;

  ngOnInit(): void {}
}
