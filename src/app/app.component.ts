import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { convertToWordCase, sleep } from './utils/essentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  animationOptions: string[] = ['ball', 'bar'];
  sortingOptions: string[] = [
    'bubble sort',
    'heap sort',
    'insertion sort',
    'merge sort',
    'quick sort',
    'selection sort',
  ];
  min: number = 0;
  max: number = 100;
  value: number = this.min;

  animationType: string = '';
  sortingType: string = '';
  unsortedNumbers: number[] = [];
  showFullSidebar: boolean = false;
  disabled: boolean = false;
  sortingComplete: boolean = false;
  pendingMinMaxChanges: { min: number; max: number } | null = null;
  convertToWordCase: (string: string) => string = convertToWordCase;
  performTheSortingAlgorithm!: () => Promise<void>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showFullSidebar = true;
    }, 400);
  }

  onMinMaxChange = (changedValue: any) => {
    if (!this.disabled) {
      this.setMinMax(changedValue.min, changedValue.max);
    } else {
      this.pendingMinMaxChanges = {
        min: changedValue.min,
        max: changedValue.max,
      };
    }
  };

  onSortingFunctionInit(performTheSortingAlgorithm: () => Promise<void>) {
    this.performTheSortingAlgorithm = performTheSortingAlgorithm;
  }

  onInput = (event: any) => {
    this.value = event.value;
  };

  onAnimationTypeChange = (changedValue: string) => {
    this.animationType = changedValue;
    this.cd.detectChanges();
  };

  onSortingTypeChange = (changedValue: string) => {
    this.sortingType = changedValue;
  };

  onHamburgerClick = (event: MouseEvent) => {
    this.showFullSidebar = !this.showFullSidebar;
    this.cd.detectChanges();
  };

  onClick = async (event: MouseEvent) => {
    if (this.sortingType != '') {
      this.disabled = true;
      this.showFullSidebar = false;
      await sleep(1000);
      await this.performTheSortingAlgorithm();
      this.disabled = false;
      this.sortingComplete = true;
      this.showFullSidebar = true;
      setTimeout(() => {
        this.sortingComplete = false;
        this.showFullSidebar = false;
      }, 3000);

      if (this.pendingMinMaxChanges) {
        this.setMinMax(
          this.pendingMinMaxChanges.min,
          this.pendingMinMaxChanges.max
        );

        this.pendingMinMaxChanges = null;
      }
    }
  };

  setMinMax = (min: number, max: number) => {
    this.min = min;
    this.max = max;
    if (this.value < this.min) {
      this.value = this.min;
    } else if (this.value > this.max) {
      this.value = this.max;
    }
    this.cd.detectChanges();
  };
}
