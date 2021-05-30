import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

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
  disabled: boolean = false;
  sortingComplete: boolean = false;
  performTheSortingAlgorithm!: () => Promise<void>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {}

  onMinMaxChange = (changedValue: any) => {
    this.min = changedValue.min;
    this.max = changedValue.max;
    this.value = this.min;
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

  onClick = async (event: MouseEvent) => {
    if (this.sortingType != '') {
      this.disabled = true;
      await this.performTheSortingAlgorithm();
      this.disabled = false;
    }
  };
}
