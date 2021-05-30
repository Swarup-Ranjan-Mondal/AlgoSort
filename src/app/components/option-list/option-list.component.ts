import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit {
  @Input() options: any;
  @Input() label: any;

  active: boolean = false;
  selected: string = '';

  ngOnInit(): void {}

  onClick(event: Event): void {
    this.active = false;
    var selectedElement = event.target as HTMLElement;

    if (selectedElement.id !== this.selected) {
      this.selected = selectedElement.id;
    }
  }

  onSelect(): void {
    this.active = !this.active;
  }
}
