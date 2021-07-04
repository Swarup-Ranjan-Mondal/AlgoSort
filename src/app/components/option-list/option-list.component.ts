import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { convertToWordCase } from 'src/app/utils/essentials';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit {
  @Input() options!: string[];
  @Input() label!: string;

  @Output() change = new EventEmitter<string>();

  active: boolean = false;
  selected: string = '';
  convertToWordCase: (string: string) => string = convertToWordCase;

  ngOnInit(): void {}

  onMouseDown(event: MouseEvent): void {
    this.active = false;
    let selectedElement = event.target as HTMLElement;

    if (selectedElement.id !== this.selected) {
      this.selected = selectedElement.id;
      this.change.emit(this.selected);
    }
  }

  onSelect(event: MouseEvent): void {
    if (this.active == false) {
      this.active = true;

      window.onmousedown = (e: MouseEvent) => {
        if (e.target != event.target) {
          this.active = false;
        }
      };
    } else {
      this.active = false;
    }
  }
}
