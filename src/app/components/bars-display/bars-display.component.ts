import { ChangeDetectorRef } from '@angular/core';
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
import BarModel from 'src/app/models/BarModel';
import { colors } from 'src/app/utils/barUtils';
import { generateUnsortedNumbers } from 'src/app/utils/essentials';

let max: number;
let conditionalSetMax: (max: number) => void;

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
  max: number = 120;
  unsortedNumbers: number[] = [];
  bars: BarModel[] = [];

  displaySection!: HTMLElement;
  sceneWidth!: number;

  resizeObserver: ResizeObserver = new ResizeObserver(function (
    entries: ResizeObserverEntry[]
  ) {
    /* since we are observing only a single element, 
      so we access the first element in entries array */
    const element = entries[0].contentRect;

    const minValue = 25;
    const maxValue = 120;
    const maxToBeSetted = Math.round(
      minValue + ((element.width - 320) * (maxValue - minValue)) / (1480 - 320)
    );
    conditionalSetMax(maxToBeSetted);
  });

  constructor(private cd: ChangeDetectorRef) {
    this.displaySection = <HTMLElement>(
      document.querySelector('.display-section')
    );
    conditionalSetMax = (max: number) => {
      this.resizeTheBars();
      this.cd.detectChanges();

      if (max >= 2 && max != this.max) {
        this.max = max;
        this.changeminmax.emit({
          min: this.min,
          max: this.max,
        });
      }
    };
  }

  ngOnInit(): void {
    this.resizeObserver.observe(this.displaySection);
    this.changeminmax.emit({
      min: this.min,
      max: this.max,
    });
    this.sortingfunctioninit.emit(this.performTheSortingAlgorithms);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value >= this.min && this.value <= this.max) {
      max = Math.floor((this.value + 6) * 1.5);
      this.unsortedNumbers = generateUnsortedNumbers(this.value, 6, max);
      this.showNumbersAsBars();
    }
  }

  showNumbersAsBars(): void {
    const length = this.unsortedNumbers.length;
    const [barWidth, hp, gap] = this.getBarsProperties(length);

    this.bars = [];
    this.sceneWidth = barWidth * length + gap * (length + 1);
    this.unsortedNumbers.forEach((number) => {
      this.bars.push({
        value: number,
        width: barWidth,
        height: hp * number,
        color: colors[0],
      });
    });
  }

  resizeTheBars(): void {
    const length = this.bars.length;
    const [barWidth, hp, gap] = this.getBarsProperties(length);

    this.sceneWidth = barWidth * length + gap * (length + 1);
    for (let i = 0; i < length; i++) {
      this.bars[i].width = barWidth;
      this.bars[i].height = hp * this.bars[i].value;
    }
  }

  getBarsProperties(
    barsNumber: number
  ): [barWidth: number, hp: number, gap: number] {
    const gap = ((barsNumber: number) => {
      const minGapValue = 4;
      const maxGapValue = 20;
      const gapValue =
        minGapValue +
        ((maxGapValue - minGapValue) * (this.max - barsNumber) * this.min) /
          ((this.max - this.min) * barsNumber);

      return Math.round(gapValue * 10) / 10;
    })(barsNumber);

    const availableWidth =
      this.displaySection.clientWidth * 0.9 - gap * (barsNumber + 1);
    const barWidth =
      barsNumber > 12 ? availableWidth / barsNumber : availableWidth / 12;
    const hp = (this.displaySection.clientHeight * 0.9 - 20) / max;

    return [barWidth, hp, gap];
  }

  performTheSortingAlgorithms = async () => {
    for (let i = 0; i < this.bars.length; i++) {
      this.bars[i].color = colors[0];
    }

    if (this.sortingType.includes('bubble')) {
      await visualizeBubbleSortWithBars(this.unsortedNumbers, this.bars);
    } else if (this.sortingType.includes('heap')) {
      await visualizeHeapSortWithBars(this.unsortedNumbers, this.bars);
    } else if (this.sortingType.includes('insertion')) {
      await visualizeInsertionSortWithBars(this.unsortedNumbers, this.bars);
    } else if (this.sortingType.includes('merge')) {
      await visualiseMergeSortWithBars(this.unsortedNumbers, this.bars);
    } else if (this.sortingType.includes('quick')) {
      await visualiseQuickSortWithBars(this.unsortedNumbers, this.bars);
    } else if (this.sortingType.includes('selection')) {
      await visualiseSelectionSortWithBars(this.unsortedNumbers, this.bars);
    }
  };
}
