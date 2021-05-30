import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { visualizeBubbleSortWithBars } from 'src/app/algorithms/bubbleSort';
import { visualizeHeapSortWithBars } from 'src/app/algorithms/heapSort';
import { visualizeInsertionSortWithBars } from 'src/app/algorithms/insertionSort';
import { visualiseMergeSortWithBars } from 'src/app/algorithms/mergeSort';
import { visualiseQuickSortWithBars } from 'src/app/algorithms/quickSort';
import { visualiseSelectionSortWithBars } from 'src/app/algorithms/selectionSort';
import { drawBars } from 'src/app/utils/canvasUtils';
import { generateUnsortedNumbers } from 'src/app/utils/essentials';

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let colorCodes: number[];
export let max: number;

@Component({
  selector: 'app-bars-display',
  templateUrl: './bars-display.component.html',
  styleUrls: ['./bars-display.component.scss'],
})
export class BarsDisplayComponent implements OnInit {
  @Input() value!: number;
  @Input() sortingType!: string;

  @Output() changeminmax = new EventEmitter<any>();
  @Output() sortingfunctioninit = new EventEmitter<() => Promise<void>>();

  min: number = 2;
  max: number = 50;
  unsortedNumbers: number[] = [];

  ngOnInit(): void {
    this.changeminmax.emit({
      min: this.min,
      max: this.max,
    });
    this.sortingfunctioninit.emit(this.performTheSortingAlgorithms);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      canvas == undefined ||
      canvas.clientWidth == 0 ||
      canvas.clientHeight == 0
    ) {
      canvas = <HTMLCanvasElement>document.querySelector('canvas');
      ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    }

    if (changes.value && this.value >= this.min && this.value <= this.max) {
      max = Math.floor(this.value * 1.5);
      this.unsortedNumbers = generateUnsortedNumbers(this.value, 1, max);
      colorCodes = new Array(this.unsortedNumbers.length).fill(0);
      drawBars(this.unsortedNumbers, colorCodes);
    }
  }

  performTheSortingAlgorithms = async () => {
    if (this.sortingType.includes('bubble')) {
      await visualizeBubbleSortWithBars(this.unsortedNumbers);
    } else if (this.sortingType.includes('heap')) {
      await visualizeHeapSortWithBars(this.unsortedNumbers);
    } else if (this.sortingType.includes('insertion')) {
      await visualizeInsertionSortWithBars(this.unsortedNumbers);
    } else if (this.sortingType.includes('merge')) {
      await visualiseMergeSortWithBars(this.unsortedNumbers);
    } else if (this.sortingType.includes('quick')) {
      await visualiseQuickSortWithBars(this.unsortedNumbers);
    } else if (this.sortingType.includes('selection')) {
      await visualiseSelectionSortWithBars(this.unsortedNumbers);
    }
  };
}
